import { Metadata } from 'next';
import React from 'react';
import Register from './Register';
import jwt from 'jsonwebtoken';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};
const LoginPage = async ({ searchParams }: { searchParams: any }) => {
  let email = null;
  let name = null;
  if (searchParams.payload) {
    jwt.verify(
      searchParams.payload,
      process.env.NEXT_PUBLIC_JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return;
        }
        email = decoded?.email;
        name = decoded?.name;
      },
    );
  }

  return (
    <>
      <div className="p-12 relative h-full w-full ">
        <div className="lg:p-8 sm:p-12 ">
          <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl text-blue-800 font-semibold tracking-tight">
                ĐĂNG KÝ
              </h1>
              <p className="text-sm text-room-blue">
                Đặt chân đến một không gian tuyệt vời - Đăng ký và trải nghiệm
                sự khác biệt tại Second Group.
              </p>
            </div>
            <Register payload={{ email, name }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
