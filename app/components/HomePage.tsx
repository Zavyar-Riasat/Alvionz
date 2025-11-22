import { getServerSession } from 'next-auth/next';
import { authOptions } from '../lib/auth';
import { redirect } from 'next/navigation';
import LogoutButton from './LogoutButton';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth');
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to Next.js Auth App
            </h1>
            <LogoutButton />
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {session.user?.name}</p>
              <p><strong>Email:</strong> {session.user?.email}</p>
              <p><strong>User ID:</strong> {(session.user as any)?.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}