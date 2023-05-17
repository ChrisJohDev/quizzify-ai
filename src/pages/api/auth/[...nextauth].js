import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "john",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // database lookup
        // const db = await openDB();
        if (
          credentials.username === "admin" &&
          credentials.password === "admin"
        ) {
          return {
            id: 2,
            name: "Admin",
            email: "admin@example.com",
          };
        }
        // login failed
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // ...add more providers here
  ],
  callbacks: {
    jwt: async (token, user) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async (session, token) => {
      if(token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: "test",
  jwt: { 
    secret: "test",
    encryption: true,
  },
};

export default NextAuth(authOptions);
