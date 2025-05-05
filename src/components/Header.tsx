'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session?.user);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="bg-[#D496A7] shadow-md min-h-[20vh] sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
            <Image src="/logo.png" alt="Logo" width={150} height={100} />
        </Link>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <button
            onClick={handleLogout}
            className="block px-3 py-1 rounded-2xl shadow hover:shadow-lg bg-red-700 text-white text-center hover:bg-white hover:text-red-500 transition"
          >
            <h2 className="text-lg">Sign Out</h2>
          </button>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              className="block px-3 py-1 rounded-2xl shadow hover:shadow-lg bg-green-600 text-white text-center hover:bg-white hover:text-green-700 transition"
            >
              <h2 className="text-lg">Sign In</h2>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
