'use client';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import InfoUser from './info-user';
import { useRouter } from 'next/navigation';

export const NavbarComponent = () => {
  const router = useRouter();
  return (
    <Navbar
      shouldHideOnScroll
      className="bg-gray"
      classNames={{
        wrapper: 'px-4',
      }}
    >
      <NavbarBrand onClick={() => router.push('/')}>
        <p className="font-bold text-white uppercase text-lg cursor-pointer">
          Hùng Luật Group
        </p>
      </NavbarBrand>

      <NavbarContent justify="end" className="ml-40">
        <NavbarItem>
          <InfoUser />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
