import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import {userSchema } from "@/util/model/user";
import bcrypt from "bcrypt";
import { IUser } from "@/util/types";
import {Model, Document} from "mongoose";

const authOptions: NextAuthOptions = {
  pages: {
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize (credentials): Promise<IUser | null> {
        // console.log("\n*** [auth] credentials:", credentials);
        try {
          const UserLocal: Model<Document & IUser> =
            mongoose.models.User || mongoose.model("User", userSchema);
          const email = credentials?.email;
          const user = await UserLocal.findOne({ email }).select("+hashedPassword");
          

          if (!user) {
            throw new Error("User not found");
          }

          const match = await bcrypt.compare(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            credentials!.password,
            user.hashedPassword
          );
          // console.log("\n*** [auth] match:", match, "\nuser:", user);
          if (!match) {
            throw new Error("Invalid credentials");
          }
          
          const pubUser: IUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            guid: user.guid,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image || '',
            role: user.role || 'user'
          };
          
          console.log("\n*** [auth] pubUser:", pubUser);

          return pubUser;

        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || ""
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user as IUser);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user as IUser;
      session && (session.user = user as IUser);

      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("\n*** [auth] signOut url:", url);
      console.log("\n*** [auth] signOut baseUrl:", baseUrl);
      return Promise.resolve('/');
    },
  },
};

export default NextAuth(authOptions);