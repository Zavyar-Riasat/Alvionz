import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../app/providers';



export const metadata: Metadata = {
  title: 'Next.js Auth App',
  description: 'Authentication with Next.js and NextAuth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};