import type { Metadata } from 'next';
import '../styles/globals.scss';
import { Inter } from 'next/font/google';
import type { ReactElement, ReactNode } from 'react';
import { Suspense } from 'react';

import Header from '@/components/header/Header';
import { ThemeProvider } from '@/context';
import ClientProvider from '@/store/provider';

import Wrapper from './wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Create next app',
};

const RootLayout = ({
  children,
  withoutHtmlBody = false,
}: Readonly<{
  children: ReactNode;
  withoutHtmlBody?: boolean;
}>): ReactElement => {
  const layoutContent = (
    <ClientProvider>
      <ThemeProvider>
        <Wrapper>
          <>
            <Suspense key="header">
              <Header />
            </Suspense>
            <main>{children}</main>
          </>
        </Wrapper>
      </ThemeProvider>
    </ClientProvider>
  );

  return withoutHtmlBody ? (
    layoutContent
  ) : (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>{layoutContent}</Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
