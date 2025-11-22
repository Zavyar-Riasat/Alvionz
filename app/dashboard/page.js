import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Navbar from '../../components/Navbar';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {session.user.name}!</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Your Information:</h3>
              <p>Email: {session.user.email}</p>
              <p>Authentication Provider: {session.user.provider}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-medium text-blue-800">Protected Content</h3>
              <p className="text-blue-700">
                This content is only accessible to authenticated users.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}