import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        id: {},
        username: {},
        token: {},
      },
      authorize: async (credentials) => {
        const { id, username, token } = credentials ?? {};
        if (id && username && token) {
          return { id, username, token };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = { id: Number(user.id), username: user.username };
        token.accessToken = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      session.token = token.accessToken;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days session storage
  },
  secret: process.env.NEXTAUTH_SECRET,
};
