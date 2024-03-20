'use client';
import React from 'react';
import AuthCarousel from './AuthCarousel';
import { useAuth } from '@/hooks/useAuth';

function layout({ children }: { children: React.ReactNode }) {
  const { useCheckLoggedIn, loading } = useAuth();

  useCheckLoggedIn();
  if (loading) return null;
  return (
    <div className="h-screen w-screen flex-row flex overflow-hidden">
      <AuthCarousel />

      <div className="h-full w-screen lg:w-1/2 overflow-auto">{children}</div>
    </div>
  );
}

export default layout;
