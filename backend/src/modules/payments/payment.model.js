import mongoose from 'mongoose';
import { PAYMENT_STATUS } from '../../constants/paymentStatus.js';

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    provider: {
      type: String,
      default: 'sepay',
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    transferContent: {
      type: String,
      required: true,
    },
    qrCodeUrl: String,
    transactionId: String,
    paidAt: Date,
    cancelledAt: Date,
    refundedAt: Date,
    rawWebhook: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);

export const Payment = mongoose.model('Payment', paymentSchema);

