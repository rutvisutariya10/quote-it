// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header';

export const metadata = {
  title: 'Lender-Borrower QuoteIt',
  description: 'A simple matchmaking tool for lenders and borrowers',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
