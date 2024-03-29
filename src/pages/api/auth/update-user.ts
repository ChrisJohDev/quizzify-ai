/**
 * Project Name: Quizzify-AI
 *
 * Update user data API endpoint.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import connectDB from '@/util/db/db';
import { userSchema } from '@/util/model/user';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';

// We need to implement a check if the email is changed.
// If so then we need to set the emailVerified to false,
// create a new emailVerificationToken and store in teh database and send a new verification email.

/**
 * Handler for the /api/auth/update-user route.
 *
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise<void>} - Nothing.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    isDevelopment && console.log('\n*** [update-user] -');
    await connectDB();

    isDevelopment && console.log('\n*** [update-user] - req.method:', req.method);

    if (req.method !== 'POST') {
      throw new Error('Method not allowed.');
    }

    const user = await req.body;
    const UserLocal = mongoose.models.User || mongoose.model('User', userSchema);
    isDevelopment && console.log('\n*** [update-user] - user:', user);

    const checkUser = await UserLocal.findOne({ _id: user.id });

    isDevelopment && console.log('\n*** [update-user] - checkUser:', checkUser);

    // We don't check the email since the user should be able to change it.
    // We do need to have something else in place so that a new email has to be verified
    // before it can be used for login.
    if (user.guid !== checkUser.guid || !checkUser.isVerified) {
      throw new Error('User not authorized.');
    }

    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const username = user.username;

    const payload = {
      firstName,
      lastName,
      email,
      username
    };

    isDevelopment && console.log('\n*** [update-user] - payload:', payload);

    const updateResult = await UserLocal.findOneAndUpdate({ _id: user.id }, payload, { new: true });

    isDevelopment && console.log('\n*** [update-user] - updateResult:', updateResult);

    res.status(204);
    res.end();
  } catch (err) {
    console.error('\n*** [update-user] - err:', err);
    res.status(500).json({ msg: 'Server error.' });
  }
};

export default handler;
