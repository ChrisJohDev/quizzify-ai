import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import { userSchema } from "@/util/model/user";
import bcrypt from "bcrypt";
import { IUser } from "@/util/types";

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
      async authorize(credentials) {
        console.log("\n*** [auth] credentials:", credentials);
        try {
          const UserLocal =
            mongoose.models.User || mongoose.model("User", userSchema);
          const user = await UserLocal.findOne({ email: credentials?.email }).select("+hashedPassword");
          

          if (!user) {
            throw new Error("User not found");
          }

          const match = await bcrypt.compare(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            credentials!.password,
            user.hashedPassword
          );
          console.log("\n*** [auth] match:", match, "\nuser:", user);
          if (!match) {
            throw new Error("Invalid credentials");
          }
          
          const pubUser: IUser = {
            id: "",
            username: "",
            email: "",
            guid: "",
            firstName: "",
            lastName: "",
            image: "",
            role: ""
          };
          const pubKeys = ["email", "firstName", "guid", "lastName", "username", "image", "role"];
          console.log("\n*** [auth] user: b4 forEach", user, '\nuser keys', Object.keys(user.toObject()));
          Object.keys(user.toObject()).forEach((key) => {
            
            console.log("\n*** [auth] key:", key);

            if(pubKeys.includes(key)) {
              console.log("\n*** [auth] pubKeys.includes:", key);
              pubUser[key] = user[key];
            }
          });

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
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user as IUser;
      session.user = user;

      return session;
    },
    // async signIn({ user, account, profile }) {

    //   console.log("\n*** [auth] signIn account:", account);
    //   console.log("\n*** [auth] signIn profile:", profile);
    //   if (user) {
    //     console.log("\n*** [auth] signIn user:", user);
    //     return Promise.resolve('/auth/profile');
    //   }
    //   console.log("\n*** [auth] signIn NO user");
    //   return Promise.resolve('/api/auth/signin');
    // },
    async redirect({ url, baseUrl }) {
      console.log("\n*** [auth] signOut url:", url);
      console.log("\n*** [auth] signOut baseUrl:", baseUrl);
      return Promise.resolve('/');
    },
  },
};

export default NextAuth(authOptions);
