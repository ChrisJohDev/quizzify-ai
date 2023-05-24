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
          console.log("\n*** [...nextauth][auth] credentials:", credentials);
          console.log("\n*** [...nextauth][auth] mongoose.models.User:", mongoose.models.User);
          const UserLocal: Model<Document & IUser> =
            mongoose.models.User || mongoose.model("User", userSchema);
          console.log("\n*** [...nextauth][auth] UserLocal:", String(UserLocal));
          const email = credentials?.email;
          console.log("\n*** [...nextauth][auth] email:", email);
          const user = await UserLocal.findOne({ email }).select("+hashedPassword");
          
          console.log("\n*** [...nextauth][auth] user:", user);

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
          
          console.log("\n*** [...nextauth][auth] pubUser:", pubUser);

          return pubUser;

        } catch (err: unknown) {
          if(err instanceof Error){
            console.error('\n*** [...nextauth][auth] err:', err.message);
          } else {
            console.error('\n*** [...nextauth][auth] err:', String(err))
          }
          
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
      console.log("\n*** [...nextauth][callbacks-redirect] url:", url);
      console.log("\n*** [...nextauth][callbacks-redirect] baseUrl:", baseUrl);
      return Promise.resolve('/');
    },
  },
};

export default NextAuth(authOptions);
