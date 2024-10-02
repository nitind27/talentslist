import { login } from "@/api/auth/auth";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsConfig = CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials) {
    const { email, password } = credentials as any;
    const res = await login({ email, password });

    if (res.error) {
      return {
        error: res.data.message,
      };
    }

    return {
      email: email,
      token: res.data.token,
      error: undefined,
      message: res.data?.message,
    };
  },
});
const config = {
  providers: [credentialsConfig],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt(prop) {
      const { token, user, account, trigger, session } = prop;
      if (trigger === "update" && session) {
        token.user = session.user;
        return token;
      }
      if (account?.provider === "credentials" && user) {
        token.user = user;
      }
      return token;
    },
    async session(props) {
      const { session, token, user, trigger, newSession } = props;
      if (token.user) {
        session.user = { ...user, ...token.user };
      }
      if (trigger === "update" && newSession?.user.userDetails) {
        console.log("session = ", newSession);
      }
      return session;
    },
    async signIn() {
      return true;
    },
  },
  // trustHost: true,
  secret: "TEST",
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
