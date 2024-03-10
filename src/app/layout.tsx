import { ApiContextProvider } from '@/components/providers/ApiProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ModalProvider } from '@/components/providers/modal-provider';
import { UserProvider } from '@/context/UserProvider';
import { RoomProvider } from '@/hooks/useRoom';
import { ReduxProvider } from '@/redux/Provider';
import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import 'react-day-picker/dist/style.css';
import { Toaster } from 'react-hot-toast';
import './globals.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
  weight: '500',
});

const metadata: Metadata = {
  title: 'HUNGLUAT APARTMENT',
  metadataBase: new URL('http://localhost:3000'),
  description: 'Real Estate By UIT',
  openGraph: {
    images: [
      'https://wallpapers.com/images/hd/house-corner-architecture-7vl0mtz3dfxod0fd.webp',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@eMartiiin94',
    title: 'Title webtsite',
    description: 'this is the desciption',
    images: ['url/image.png'],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logoEstate.png" />
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
        <ColorSchemeScript />
      </head>
      <body
        className={`${montserrat.variable} ${montserrat.style.fontWeight}`}
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <ReduxProvider>
          <UserProvider>
            <ApiContextProvider>
              <MantineProvider>
                <QueryProvider>
                  <RoomProvider>
                    <Toaster />
                    <ModalProvider />
                    {children}
                  </RoomProvider>
                </QueryProvider>
              </MantineProvider>
            </ApiContextProvider>
          </UserProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};
export { metadata };
export default RootLayout;
