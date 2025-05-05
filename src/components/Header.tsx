'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

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
    <header className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold cursor-pointer" onClick={() => router.push('/')}>
          QuoteIt
        </h1>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push('/auth')}
                className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/auth')}
                className="text-sm bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
