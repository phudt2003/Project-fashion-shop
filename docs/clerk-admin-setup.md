# Clerk Admin Role Setup Guide

This guide explains how to set up admin role management using Clerk in the Fashion Shop project.

## Overview

The project uses Clerk for authentication and role-based access control. Admin roles are stored in Clerk's Public Metadata as `role: "admin"`.

## Prerequisites

1. Clerk account and application set up
2. Backend environment configured with Clerk credentials
3. Frontend already configured with Clerk (already done)

## Step 1: Configure Backend Environment Variables

Add the following to your backend `.env` file:

```env
CLERK_SECRET_KEY=your_clerk_secret_key_here
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

**How to get these keys:**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Navigate to **API Keys** section
4. Copy the Secret Key and Publishable Key

## Step 2: Get User ID

To assign admin role to a user, you need their Clerk User ID.

**Method 1: From Clerk Dashboard**
1. Go to Clerk Dashboard → **Users**
2. Click on the user you want to make admin
3. Copy the **User ID** from the user details page

**Method 2: From Frontend**
1. Log in as the user you want to make admin
2. Open browser console
3. Run: `window.Clerk.user.id`
4. Copy the returned User ID

## Step 3: Assign Admin Role

Use the provided script to assign admin role to a user:

```bash
cd backend
node scripts/makeAdmin.js <user_id>
```

**Example:**
```bash
node scripts/makeAdmin.js user_2abc123xyz456
```

The script will:
- Verify the user exists
- Display current user info (email, current role)
- Update user's public metadata to set `role: "admin"`
- Confirm successful assignment

## Step 4: Verify Admin Role

### Frontend Verification

The user should now be able to access admin routes. The `AdminRoute` component checks:

```javascript
user.publicMetadata.role === 'admin'
```

### Backend Verification

Admin API routes are protected by:
1. `clerkAuthMiddleware` - Validates Clerk JWT token
2. `requireAuth` - Ensures user is authenticated
3. `adminMiddleware` - Checks user has admin role in metadata

Test admin API:
```bash
curl http://localhost:5000/api/v1/admin/health \
  -H "Authorization: Bearer <your_clerk_token>"
```

## How It Works

### Frontend

- **ClerkProvider**: Wraps the app in `main.jsx`
- **useAuth hook**: Maps `user.publicMetadata.role` to `user.role`
- **AdminRoute component**: Checks if `user.role === 'admin'`

### Backend

- **clerkAuthMiddleware**: Validates Clerk JWT tokens using `@clerk/express`
- **requireAuth**: Ensures request has valid authentication
- **adminMiddleware**: Checks `req.auth.sessionClaims.metadata.role === 'admin'`

## Admin Role Structure

Admin role is stored in Clerk's Public Metadata:

```json
{
  "publicMetadata": {
    "role": "admin"
  }
}
```

This metadata is:
- **Public**: Can be accessed by frontend (safe for role checks)
- **Immutable by users**: Only backend/admin can modify
- **Included in JWT**: Available in session claims for backend validation

## Security Considerations

### ✅ Secure Practices

1. **Public Metadata**: Role is in public metadata (not private) for frontend access
2. **Backend Validation**: All admin APIs verify role from session claims
3. **JWT Verification**: Clerk middleware validates token signatures
4. **No Hardcoded Admins**: Admin role assigned via script, not hardcoded

### ⚠️ Important Notes

1. **Secret Key Security**: Never commit `CLERK_SECRET_KEY` to version control
2. **Token Expiration**: Clerk tokens expire, ensure proper token refresh
3. **Role Changes**: Role changes require user to re-login to take effect
4. **Multiple Admins**: Script can be run multiple times for different users

## Troubleshooting

### Script Fails with "User not found"

**Cause**: Invalid User ID
**Solution**: Verify User ID from Clerk Dashboard

### Script Fails with "Authentication failed"

**Cause**: Invalid or missing `CLERK_SECRET_KEY`
**Solution**: Check backend `.env` file has correct Clerk Secret Key

### User Cannot Access Admin Routes

**Cause**: Role not set or user not logged in
**Solution**: 
1. Verify role was assigned successfully
2. User must sign out and sign back in for new role to take effect
3. Check browser console for authentication errors

### Backend Returns 403 Forbidden

**Cause**: User doesn't have admin role in session claims
**Solution**: 
1. Verify role is set in Clerk Dashboard
2. Check that backend is using correct Clerk Secret Key
3. Ensure token is not expired

## Removing Admin Role

To remove admin role from a user, you can:

**Option 1: Using Clerk Dashboard**
1. Go to Clerk Dashboard → Users
2. Select the user
3. Go to **Metadata** section
4. Remove or change the `role` field

**Option 2: Using Script (modify makeAdmin.js)**
Create a new script or modify existing to set role to `customer` or remove it.

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Metadata Guide](https://clerk.com/docs/users/manage-user-metadata)
- [Clerk Backend SDK](https://clerk.com/docs/backend-requests/resources)

## Summary

✅ Admin role system is fully integrated with Clerk
✅ Frontend checks role from public metadata
✅ Backend validates role from session claims
✅ Admin APIs are protected with middleware
✅ Admin pages are protected with route guards
✅ Script provided for easy admin assignment
