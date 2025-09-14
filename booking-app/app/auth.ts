import { db } from "@/lib/db";
import { schema } from "@/lib/user_schema";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { hash } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { v4 as uuid } from "uuid";
import { encode } from "next-auth/jwt";

const adapter = PrismaAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        /* const email = "test@test.com";
        const password = "1234";

        if (credentials.email === email && credentials.password === password) {
          return { email, password };
        } else {
          throw new Error("Invalid credentials.");
        } */
        const validatedCredentials = schema.parse(credentials);

        const hashedPassword = hash(<string>validatedCredentials.password, 10);

        const user = await db.user.findFirst({
          where: {
            email: validatedCredentials.email,
            passwordHash: hashedPassword,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("url", url);
      console.log("baseUrl", baseUrl);

      return url;
    },
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return encode(params);
    },
  },
});
