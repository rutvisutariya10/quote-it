// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header';

export const metadata = {
  title: 'Quote-It',
  description: 'A simple matchmaking tool for lenders and borrowers',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#ECECD9] text-gray-900">
        <Header />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
