import type { NextAuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: 'credentials',
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        noInduk: { label: 'NoInduk', type: 'text', placeholder: 'Nomor Induk' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.noInduk || !credentials.password)
          throw new Error(
            'Credential Error, silahkan coba dalam beberapa saat lagi'
          );

        const res = await fetch('http://127.0.0.1:8000/api/login', {
          method: 'POST',
          body: JSON.stringify({
            nomor_induk: credentials.noInduk,
            password: credentials.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 500) {
          throw new Error(
            'Server Error, silahkan coba dalam beberapa saat lagi'
          );
        }

        const parsedResponse = await res.json();

        if (res.status === 401) {
          throw new Error(parsedResponse.error);
        }
        if (res.status === 200) {
          return parsedResponse;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '../../../Login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token = user as unknown as { [key: string]: any };
      return Promise.resolve(token);
    },
    session: async ({ session, token, user }) => {
      session.user = token.user as unknown as User;
      session.accessToken = token.token as unknown as string;
      return Promise.resolve(session);
    },
  },
};
