import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        // Check if user exists
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with this email');
        }

        // Check password
        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.provider = token.provider;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === 'google' || account.provider === 'facebook') {
        await dbConnect();
        
        // Check if user already exists
        const existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          // Create new user for OAuth
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
          });
        }
        
        return true;
      }
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };