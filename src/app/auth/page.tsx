'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Invalid Credentials. Try Signing-Up!");
    } else {
      router.push('/');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
    });
    if (error) {
      alert("Please enter the credentials and then click Sign Up :)");
    } else {
      alert('Check your email for confirmation!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-[#ECECD9]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Welcome!</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#173054]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#173054]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 hover:bg-[#fae5eb] text-white font-semibold rounded-md bg-[#D496A7] hover:text-[#D496A7] transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleSignup}
            className="text-[#173054] hover:text-blue-600 font-semibold"
          >
            Dont have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
