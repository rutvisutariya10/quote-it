// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-[#ECECD9] min-h-[80vh] flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full p-4">
        {/* Borrower Box */}
        <Link
          href="/borrower"
          className="block p-6 rounded-2xl shadow hover:shadow-lg bg-white border border-gray-200 text-center hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-bold text-blue-400 mb-2">I am a Borrower</h2>
          <p className="text-gray-600">Post a loan request to find matching lenders.</p>
        </Link>

        {/* Lender Box */}
        <Link
          href="/lender"
          className="block p-6 rounded-2xl shadow hover:shadow-lg bg-white border border-gray-200 text-center hover:bg-green-50 transition"
        >
          <h2 className="text-xl font-bold text-green-700 mb-2">I am a Lender</h2>
          <p className="text-gray-600">Browse and filter loan requests to express interest.</p>
        </Link>
      </div>
    </div>
  );
}
