import { Webhook } from 'svix';
import { env } from '../../config/env.js';
import { User } from './user.model.js';
import { ROLES } from '../../constants/roles.js';

/**
 * Clerk Webhook Service
 * Handles synchronization of Clerk users with MongoDB
 */
export const clerkWebhookService = {
  /**
   * Process Clerk webhook events
   */
  async processWebhook(rawBody, headers) {
    const svixId = headers['svix-id'];
    const svixTimestamp = headers['svix-timestamp'];
    const svixSignature = headers['svix-signature'];

    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new Error('Missing Svix headers');
    }

    if (!env.clerkWebhookSecret) {
      throw new Error('CLERK_WEBHOOK_SECRET is not configured');
    }

    // Verify webhook signature using Svix
    const wh = new Webhook(env.clerkWebhookSecret);

    let evt;
    try {
      // rawBody is a Buffer when using express.raw()
      const bodyString = typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8');
      evt = wh.verify(bodyString, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      });
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      throw new Error('Invalid webhook signature');
    }

    const eventType = evt.type;
    const data = evt.data;

    console.log(`📩 Clerk webhook received: ${eventType}`);

    switch (eventType) {
      case 'user.created':
        await this.handleUserCreated(data);
        break;
      case 'user.updated':
        await this.handleUserUpdated(data);
        break;
      case 'user.deleted':
        await this.handleUserDeleted(data);
        break;
      default:
        console.log(`⚠️  Unhandled event type: ${eventType}`);
    }

    return { received: true, eventType };
  },

  /**
   * Handle user.created event
   */
  async handleUserCreated(clerkUser) {
    const { id, email_addresses, first_name, last_name, image_url, public_metadata } = clerkUser;
    const email = email_addresses[0]?.email_address;

    if (!email) {
      console.error('❌ User created without email');
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`ℹ️  User with email ${email} already exists, linking to Clerk`);
      existingUser.clerkId = id;
      existingUser.firstName = first_name;
      existingUser.lastName = last_name;
      existingUser.avatar = image_url;
      if (public_metadata?.role) {
        existingUser.role = public_metadata.role;
      }
      await existingUser.save();
      return;
    }

    // Create new user
    await User.create({
      clerkId: id,
      email,
      firstName: first_name,
      lastName: last_name,
      name: `${first_name || ''} ${last_name || ''}`.trim() || email.split('@')[0],
      avatar: image_url,
      role: public_metadata?.role || ROLES.USER,
      isActive: true,
    });

    console.log(`✅ User created in MongoDB: ${email} (Clerk ID: ${id})`);
  },

  /**
   * Handle user.updated event
   */
  async handleUserUpdated(clerkUser) {
    const { id, email_addresses, first_name, last_name, image_url, public_metadata } = clerkUser;
    const email = email_addresses[0]?.email_address;

    const user = await User.findOne({ clerkId: id });
    if (!user) {
      console.log(`⚠️  User not found in MongoDB for Clerk ID: ${id}`);
      return;
    }

    // Update user fields
    if (email && email !== user.email) {
      user.email = email;
    }
    if (first_name !== undefined) user.firstName = first_name;
    if (last_name !== undefined) user.lastName = last_name;
    if (image_url) user.avatar = image_url;
    if (public_metadata?.role) user.role = public_metadata.role;

    await user.save();
    console.log(`✅ User updated in MongoDB: ${email} (Clerk ID: ${id})`);
  },

  /**
   * Handle user.deleted event
   */
  async handleUserDeleted(clerkUser) {
    const { id } = clerkUser;

    const user = await User.findOne({ clerkId: id });
    if (!user) {
      console.log(`⚠️  User not found in MongoDB for Clerk ID: ${id}`);
      return;
    }

    // Soft delete by setting isActive to false
    user.isActive = false;
    await user.save();

    console.log(`✅ User deactivated in MongoDB: ${user.email} (Clerk ID: ${id})`);
  },
};
