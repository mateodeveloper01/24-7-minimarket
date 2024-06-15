import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signSchema } from "@/schemas/loginSchema";
import { getUserFromDb } from "@/utils/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const { email, password } = await signSchema.parseAsync(credentials);

        user = await getUserFromDb(email);

        if (!user || !user.password) return null;

        if (password === user.password) {
          console.log(user);
          return user;
        }

        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: "/login",
  // },
});
