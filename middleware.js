import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Additional middleware logic can go here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all routes except auth and public pages
        if (req.nextUrl.pathname.startsWith('/auth') && token) {
          return false; // Redirect authenticated users away from auth pages
        }
        return !!token; // Require authentication for other pages
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    // Add other protected routes here
  ],
};