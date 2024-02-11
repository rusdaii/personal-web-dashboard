import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { getUser } from '@/repositories/user';
import { User } from '@/repositories/user/types';

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 1,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const { id, accessToken } = credentials as {
            id: string;
            accessToken: string;
          };

          const { data: user } = await getUser(id, accessToken);

          return user;
        } catch (error) {
          return null;
        }
      },
      credentials: {
        id: {
          label: 'ID',
        },
        accessToken: {
          label: 'Access Token',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as User;

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.avatar) {
        token.user.avatar = session.avatar;
      }

      if (user) {
        token.user = user as User;
      }

      return token;
    },
  },
};
