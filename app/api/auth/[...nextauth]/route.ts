import { prisma } from '@/lib/prisma';
import { sendVerificationRequest } from '@/lib/resend';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { AuthOptions } from "next-auth";
import NextAuth from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import EmailProvider from "next-auth/providers/email";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  jwt: {
    secret: process.env.SECRET
  },
  debug: true
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };