// components/IdleTimer.tsx
'use client'; // Add this directive to mark this file as a client component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const IdleTimer: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function handleActivity() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Clear token and redirect to login
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/login');
      }, 3600000); // 1 heures

      // Reset timeout on user activity
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keypress', handleActivity);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('mousemove', handleActivity);
        window.removeEventListener('keypress', handleActivity);
      };
    }

    handleActivity();
  }, [router]);

  return null;
};

export default IdleTimer;
