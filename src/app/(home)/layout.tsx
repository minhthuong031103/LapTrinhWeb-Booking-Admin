'use client';

import { NavbarComponent } from '@/components/navbar/navbar';
import { SidebarWrapper } from '@/components/sidebar/sidebar';
import { useUserState } from '@/context/UserProvider';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';

const layout = ({ children }) => {
  const { useCheckNotLoggedIn, loading } = useAuth();
  useCheckNotLoggedIn();
  if (loading) return null;

  return (
    <section className="flex w-full">
      <SidebarWrapper />
      <div className="w-full">
        <NavbarComponent />
        <div className="w-full px-3 py-4">{children}</div>
      </div>
    </section>
  );
};

export default layout;
