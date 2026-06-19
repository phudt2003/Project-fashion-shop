import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { ApiError } from '../../utils/ApiError.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/generateToken.js';
import { sendEmail } from '../../utils/sendEmail.js';
import { User } from '../users/user.model.js';
import { Token } from './token.model.js';

function getRefreshExpiry() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
}

async function persistRefreshToken(user, refreshToken) {
  await Token.create({
    user: user._id,
    refreshToken,
    expiresAt: getRefreshExpiry(),
  });
}

export const authService = {
  register: async (payload) => {
    const existed = await User.findOne({ email: payload.email });
    if (existed) throw new ApiError(409, 'Email already exists');

    const user = await User.create(payload);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await persistRefreshToken(user, refreshToken);

    return { user: await User.findById(user._id).select('-password'), accessToken, refreshToken };
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await persistRefreshToken(user, refreshToken);

    user.password = undefined;
    return { user, accessToken, refreshToken };
  },

  refreshToken: async (refreshToken) => {
    const storedToken = await Token.findOne({ refreshToken, revokedAt: null });
    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    const payload = jwt.verify(refreshToken, env.jwtRefreshSecret);
    const user = await User.findById(payload.sub);
    if (!user) throw new ApiError(401, 'Invalid refresh token');

    const accessToken = generateAccessToken(user);
    return { accessToken, refreshToken };
  },

  logout: async (refreshToken) => {
    await Token.findOneAndUpdate({ refreshToken }, { revokedAt: new Date() });
  },

  forgotPassword: async (email) => {
    const user = await User.findOne({ email });
    if (!user) return;

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Fashion Shop password reset',
      html: `<p>Reset token: ${resetToken}</p>`,
    });
  },

  resetPassword: async (token, password) => {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) throw new ApiError(400, 'Invalid or expired reset token');

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  },
};

