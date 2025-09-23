import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import cookies from "@/lib/utils/cookies";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // This is a placeholder for the actual authentication logic
          // The real implementation would call your API endpoint
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (data.data && data.data.access) {
            // Store tokens in cookies
            cookies.set("access_token", data.data.access);
            if (data.data.refresh) {
              cookies.set("refresh_token", data.data.refresh);
            }

            // Return user data for session
            return {
              id: data.data.userId || "unknown",
              name: data.data.name || credentials.username,
              email: data.data.email || "",
              role: data.data.role || "user",
              accessToken: data.data.access,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger, isNewUser, session }: { token: JWT; user: any; account: any | null; profile?: any; trigger?: "signIn" | "signUp" | "update"; isNewUser?: boolean; session?: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT; user?: AdapterUser; newSession?: any; trigger?: "update"; }) {
      if (token) {
        if (!session.user) {
          session.user = {};
        }
        (session.user as any).role = token.role as "user" | "admin";
        (session as any).accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
};

export default authOptions;