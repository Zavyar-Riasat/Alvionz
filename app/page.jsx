import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Navbar from '../components/Navbar';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to NextAuth App
        </h1>
        <div className="text-center">
          {session ? (
            <div>
              <p className="text-xl mb-4">Hello, {session.user.name}!</p>
              <Link
                href="/dashboard"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-xl mb-4">Please sign in to access your dashboard</p>
              <div className="space-x-4">
                <Link
                  href="/auth/signin"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}