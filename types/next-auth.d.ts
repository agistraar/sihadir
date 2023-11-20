import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      nomor_induk: string;
      role: number;
    };
    accessToken: string;
  }
  interface User {
    id: string;
    name: string;
    nomor_induk: string;
    role: number;
  }
  // interface JWT {
  //   role:
  // }
}
