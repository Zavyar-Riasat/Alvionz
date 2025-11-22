'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          NextAuth App
        </Link>
        
        <div className="flex items-center space-x-4">
          {status === 'loading' ? (
            <span>Loading...</span>
          ) : session ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-200">
                Dashboard
              </Link>
              <span>Welcome, {session.user.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="hover:text-blue-200">
                Sign In
              </Link>
              <Link href="/auth/signup" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}