import { useEffect, useRef, useCallback, useState } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/react';
import { setTokenGetter } from '../lib/axiosClient';
import { env } from '../config/env';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1500; // ms

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useAuth() {
  const { isSignedIn, user, isLoaded: clerkLoaded } = useUser();
  const { getToken } = useClerkAuth();
  const [dbUser, setDbUser] = useState(null);
  const [dbLoaded, setDbLoaded] = useState(false);
  const hasSynced = useRef(false);

  // Cung cấp token getter cho axiosClient
  useEffect(() => {
    if (isSignedIn && getToken) {
      setTokenGetter(() => getToken());
      return () => setTokenGetter(null);
    }

    setTokenGetter(null);
    return undefined;
  }, [getToken, isSignedIn]);

  // Đồng bộ và tải thông tin user từ MongoDB (có retry)
  const syncAndFetchUser = useCallback(async () => {
    if (!isSignedIn || !user || hasSynced.current) {
      if (!isSignedIn) setDbLoaded(true);
      return;
    }

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const token = await getToken();
        if (!token) {
          setDbLoaded(true);
          return;
        }

        console.log('🔍 Syncing user from MongoDB, Clerk ID:', user.id);

        // 1. Gọi sync-user để đảm bảo user tồn tại trong MongoDB
        const syncResponse = await fetch(`${env.apiBaseUrl}/auth/sync-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
          }),
        });

        if (syncResponse.ok) {
          const syncData = await syncResponse.json();
          if (syncData?.data) {
            console.log('✅ Sync user data:', syncData.data);
            setDbUser(syncData.data);
            hasSynced.current = true;
          }
        } else {
          console.warn('⚠️ Sync user failed:', syncResponse.status);
        }

        // 2. Lấy thông tin mới nhất từ MongoDB (bao gồm role)
        const meResponse = await fetch(`${env.apiBaseUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (meResponse.ok) {
          const meData = await meResponse.json();
          if (meData?.data) {
            console.log('✅ User from MongoDB:', meData.data);
            setDbUser(meData.data);
            hasSynced.current = true;
          }
        } else {
          console.warn('⚠️ Get user from MongoDB failed:', meResponse.status);
        }

        // Nếu tới được đây mà không lỗi → thành công, thoát vòng retry
        setDbLoaded(true);
        return;
      } catch (error) {
        console.warn(
          `⚠️ Sync attempt ${attempt}/${MAX_RETRIES} failed:`,
          error.message,
        );

        if (attempt < MAX_RETRIES) {
          await wait(RETRY_DELAY * attempt);
        } else {
          console.error('❌ All sync attempts failed. Backend may be down.');
          setDbLoaded(true);
        }
      }
    }
  }, [isSignedIn, user, getToken]);

  useEffect(() => {
    if (clerkLoaded) {
      if (isSignedIn) {
        syncAndFetchUser();
      } else {
        setDbUser(null);
        setDbLoaded(true);
        hasSynced.current = false;
      }
    }
  }, [clerkLoaded, isSignedIn, syncAndFetchUser]);

  // Phân quyền ưu tiên: MongoDB → Clerk publicMetadata → mặc định 'user'
  const role = dbUser?.role || user?.publicMetadata?.role || 'user';
  const userWithRole = user ? { ...user, role, dbUser } : null;

  // Debug logging
  if (clerkLoaded && dbLoaded && isSignedIn) {
    console.log('🔍 Auth state:', {
      clerkId: user?.id,
      dbUser: dbUser,
      dbUserRole: dbUser?.role,
      clerkMetadataRole: user?.publicMetadata?.role,
      finalRole: role,
      isAdmin: role === 'admin',
    });
  }

  return {
    isSignedIn,
    isAuthenticated: isSignedIn,
    user: userWithRole,
    isLoaded: clerkLoaded && dbLoaded,
  };
}
