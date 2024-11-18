import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { getUserFromDb } from "./app/actions/auth/get-user-from-db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt", // This avoids storing session data in cookies directly
  },
  providers: [
    GitHub,
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        let user = null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        user = await getUserFromDb(email, password);

        return user || null;
      },
    }),
  ],
});
