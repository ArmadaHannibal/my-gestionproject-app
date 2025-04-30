'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import IdleTimer from '../components/IdleTimer';
import { UserProvider } from '@/app/context/UserContext';
import { Navbar } from '@/components/navbar';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Définissez les routes où vous ne voulez pas afficher le composant
  const hideComponentRoutes = ['/dashboard', '/dashboard/profile', '/dashboard/membre'];

  useEffect(() => {
    // Logique d'effet, si nécessaire
  }, [pathname]);

  return (
    <UserProvider>
      <IdleTimer />
      <div className="relative flex flex-col h-screen">
        {!hideComponentRoutes.includes(pathname) && <Navbar />}
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </UserProvider>
  );
};

export default ClientLayout;
