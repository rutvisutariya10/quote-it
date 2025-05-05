// src/components/Card.tsx
import { ReactNode } from 'react';

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">{children}</div>
  );
}
