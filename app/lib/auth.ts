import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from './mongoose';
import User from '../models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        
        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await user.comparePassword(credentials.password as string);
        
        if (!isPasswordValid) {
          return null;
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
    async signIn({ user, account, profile }: any) {
      if (account?.provider === 'credentials') {
        return true;
      }

      await connectDB();

      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          const existingUser = await User.findOne({ 
            $or: [
              { email: user.email },
              { providerId: account.providerAccountId }
            ]
          });

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider,
              providerId: account.providerAccountId,
              emailVerified: true,
            });
          } else {
            await User.findByIdAndUpdate(existingUser._id, {
              name: user.name,
              image: user.image,
              lastLogin: new Date(),
            });
          }
        } catch (error) {
          console.error('Error in social signin:', error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};