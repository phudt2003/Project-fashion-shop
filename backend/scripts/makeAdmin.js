import { clerkClient } from '@clerk/backend';
import { config } from 'dotenv';

// Load environment variables
config();

// Get Clerk Secret Key from environment
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

if (!CLERK_SECRET_KEY) {
  console.error('❌ Error: CLERK_SECRET_KEY is required in .env file');
  console.error('Please add CLERK_SECRET_KEY to your backend .env file');
  process.exit(1);
}

// Get user ID from command line argument
const userId = process.argv[2];

if (!userId) {
  console.error('❌ Error: User ID is required');
  console.error('Usage: node scripts/makeAdmin.js <user_id>');
  console.error('');
  console.error('To get user ID, you can:');
  console.error('1. Go to Clerk Dashboard -> Users');
  console.error('2. Click on the user you want to make admin');
  console.error('3. Copy the User ID from the URL or user details');
  process.exit(1);
}

async function makeAdmin() {
  try {
    console.log(`🔑 Setting up Clerk client...`);
    
    // Initialize Clerk client
    const clerk = clerkClient({
      secretKey: CLERK_SECRET_KEY,
    });

    console.log(`👤 Fetching user: ${userId}`);
    
    // Get user info first
    const user = await clerk.users.getUser(userId);
    
    console.log(`📧 User email: ${user.emailAddresses[0]?.emailAddress}`);
    console.log(`🏷️  Current role: ${user.publicMetadata?.role || 'none'}`);
    
    // Update user metadata to set admin role
    console.log(`⚙️  Updating user metadata to set admin role...`);
    
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'admin'
      }
    });

    console.log(`✅ Admin role assigned successfully!`);
    console.log(``);
    console.log(`📋 Summary:`);
    console.log(`   User ID: ${userId}`);
    console.log(`   Email: ${user.emailAddresses[0]?.emailAddress}`);
    console.log(`   Role: admin`);
    console.log(``);
    console.log(`🎉 The user now has admin privileges and can access admin routes.`);
    
  } catch (error) {
    console.error('❌ Error assigning admin role:', error.message);
    
    if (error.status === 404) {
      console.error('');
      console.error('User not found. Please check the User ID.');
    } else if (error.status === 401) {
      console.error('');
      console.error('Authentication failed. Please check your CLERK_SECRET_KEY.');
    }
    
    process.exit(1);
  }
}

makeAdmin();
