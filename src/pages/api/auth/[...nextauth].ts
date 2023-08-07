/* eslint-disable jsdoc/require-param-type */
/**
 * Project Name: Quizzify-AI
 *
 * Authorization API
 *
 * Original code from url: https://next-auth.js.org/deployment
 *
 * Modified by:
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
import { userSchema } from '@/util/model/user';
import bcrypt from 'bcrypt';
import { IUser } from '@/util/types';
import mongoose, { Model, Document } from 'mongoose';
import connectDB from '@/util/db/db';

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request'
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Email',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'john.doe@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      /**
       * Authorize callback.
       *
       * @param {} credentials - the credentials
       * @returns {Promise<IUser | null>} - the user if authorized, otherwise null
       */
      async authorize (credentials): Promise<IUser | null> {
        /**
         * Converts a mongoose document to an IUser.
         *
         * @param {any} doc - the mongoose document
         * @returns {IUser} - the IUser
         * @private
         */
        const toIUser = (doc: Document & IUser): IUser => {
          return {
            id: doc.id,
            guid: doc.guid,
            username: doc.username,
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email,
            salt: doc.salt,
            hashedPassword: doc.hashedPassword,
            isVerified: doc.isVerified,
            verificationToken: doc.verificationToken,
            verificationTokenExpires: doc.verificationTokenExpires,
            resetPasswordToken: doc.resetPasswordToken,
            role: doc.role,
            image: doc.image || ''
          } as IUser;
        };
        // console.log("\n*** [auth] credentials:", credentials);
        try {
          // console.log("\n*** [...nextauth][auth] authorize -");
          await connectDB();
          // console.log("\n*** [...nextauth][auth] credentials:", credentials);
          // console.log("\n*** [...nextauth][auth] mongoose.models.User:", mongoose.models.User);
          const UserLocal: Model<Document & IUser> =
            mongoose.models.User || mongoose.model('User', userSchema);
          // console.log("\n*** [...nextauth][auth] UserLocal:", String(UserLocal));
          const email = credentials?.email;
          // console.log("\n*** [...nextauth][auth] email:", email);
          const user = await UserLocal.findOne({ email }).select('+hashedPassword');

          console.log('\n*** [...nextauth][auth] user:', user);

          if (!user) {
            throw new Error('User not found');
          }

          const match = await bcrypt.compare(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            credentials!.password,
            user.hashedPassword
          );
          // console.log('\n*** [auth] match:', match, '\nuser:', user);
          if (!match) {
            throw new Error('Invalid credentials');
          }

          const pubUser: IUser = toIUser(user);

          // console.log("\n*** [...nextauth][auth] pubUser:", pubUser);

          return pubUser;
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error('\n*** [...nextauth][auth] err:', err.message);
          } else {
            console.error('\n*** [...nextauth][auth] err:', String(err));
          }
        }
        return null;
      }
    })
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID || "",
    //   clientSecret: process.env.GOOGLE_SECRET || ""
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID || "",
    //   clientSecret: process.env.FACEBOOK_SECRET || ""
    // })
  ],
  callbacks: {
    /**
     * Checks if the user is valid.
     * If user is valid, the user property of token is set.
     *
     * @param root0 - the root
     * @param root0.user - the user
     * @param root0.token - the token
     * @returns {Promise<{}>} - the token
     */
    jwt: async ({ token, user }) => {
      user && (token.user = user as IUser);
      return token;
    },
    /**
     * Checks if the session is valid.
     * If session is valid, the user property of session is set.
     *
     * @param root0 - the root
     * @param root0.session - the session
     * @param root0.token - the token
     * @returns {Promise<{}>} - the session
     */
    session: async ({ session, token }) => {
      const user = token.user as IUser;
      session && (session.user = user);

      return session;
    },
    /**
     * Redirects to home page.
     *
     * @param root0 - the root
     * @param root0.url - the url
     * @param root0.baseUrl - the base url
     * @returns {Promise<string>} - the redirect url
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async redirect ({ url, baseUrl }) {
      // console.log('\n*** [...nextauth][callbacks-redirect] url:', url);
      // console.log('\n*** [...nextauth][callbacks-redirect] baseUrl:', baseUrl);
      return Promise.resolve('/'); // redirect to home page
    },
    /**
     * Checks if a user is valid.
     *
     * @param root0 - the root
     * @param root0.user - the user
     * @param root0.account - the account
     * @param root0.profile - the profile
     * @param root0.email - the email
     * @param root0.credentials - the credentials
     * @returns {Promise<boolean>} - true if valid, otherwise false
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn ({ user, account, profile, email, credentials }) {
      // console.log('\n*** [...nextauth][callbacks-signin] user:', user);
      // console.log('\n*** [...nextauth][callbacks-signin] account:', account);
      // console.log('\n*** [...nextauth][callbacks-signin] profile:', profile);
      // console.log('\n*** [...nextauth][callbacks-signin] email:', email);
      // console.log('\n*** [...nextauth][callbacks-signin] credentials:', credentials);
      return Promise.resolve(true);
    }
  }
};

export default NextAuth(authOptions);
export { authOptions };
