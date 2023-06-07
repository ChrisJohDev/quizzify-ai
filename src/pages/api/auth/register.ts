/**
 * Project Name: Quizzify-AI
 * 
 * Register API endpoint.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
// import { connectDB } from '@/util/db/db';
import { userSchema } from '@/util/model/user';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import connectDB from '@/util/db/db';

// Change to false for production build.
const isDevelopment = true;

// Sending verification email through Sendgrid API
const PATH = '/auth/verify-email';


/**
 * Send verification email to user.
 *
 * @param {string} email
 * @param {string} guid
 * @param {string} verificationToken
 * @param {string} origin
 * @param {string} path
 * @return {*} 
 */
const sendVerificationEmail = async (email: string, guid: string, verificationToken: string, origin: string, path: string) => {
  isDevelopment && console.log('\n*** [register-sendVerificationEmail] - email:', email, 'guid:', guid, 'verificationToken:', verificationToken, 'origin:', origin, 'path:', path);

  // const apiKey = process.env.SENDGRID_API_KEY || '';
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || '';
  // console.log('\n*** [register-sendVerificationEmail] - \napiKey:', apiKey, '\nfromEmail:', fromEmail);
  sgMail.setApiKey(String(process.env.SENDGRID_API_KEY));

  const verificationURL = `${origin}${path}?token=${verificationToken}&id=${guid}`;
  const msg = {
    to: email, // Change to your recipient
    from: fromEmail, // Change to your verified sender
    subject: 'Please verify your email address - Quizzify-AI.org ',
    text: `You need to verify your email address to complete registration. Please click on the following link, or paste this into your browser to complete the process:\n\n${verificationURL}\n\nThis link will expire in 24 hours.\n`,
    html: `<p>You need to verify your email address to complete registration. Please click on the following link, or paste this into your browser to complete the process:</p><div><button><a href="${verificationURL}">Verify Email</a></button></div><p>This link will expire in 24 hours.</p>`
  }

  isDevelopment && console.log('\n*** [register-sendVerificationEmail] - msg:', msg);
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     return { ok: true };
  //   })
  //   .catch((error) => {
  //     console.error('\n*** [register-sendVerificationEmail] error:', error);
  //   });

  // (async () => {
  try {
    const mailResponse = await sgMail.send(msg);
    isDevelopment && console.log('\n*** [register-sendgrid] mailResponse:', mailResponse);
    return Promise.resolve({ ok: true });
  } catch (err) {
    console.error('\n*** [register-sendgrid] err:', err);
  }
  console.log('\n*** [register-sendgrid] - after try/catch which shouldn\'t be possible if we don\'t encounter an error.');
  // })();
  // If we get here something went wrong.
  return Promise.resolve({ ok: false });
}



/**
 * Register handler.
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  isDevelopment && console.log('\n*** [register-handler] -');

  try {
    await connectDB();
    const { username, firstName, lastName, email, pword, confirm_pword } = req.body;
    const origin = req.headers.origin ? req.headers.origin : 'http://localhost:3000';

    // isDevelopment && console.log('\n*** [register-handler] \nusername:', username, '\nfirstName:', firstName, '\nlastName:', lastName, '\nemail:', email, '\npword:', pword, '\nconfirm_pword:', confirm_pword);


    if (pword !== confirm_pword) {
      throw new Error('Passwords do not match.');
    }
    const UserLocal = mongoose.models.User || mongoose.model('User', userSchema);

    isDevelopment && console.log('\n *** [register-handler] UserLocal:', UserLocal);

    // const emailExists = await User.findOne({ email });
    // const usernameExists = await User.findOne({ username });

    // const userExists = false;

    // Uncomment when checks should be active.
    // if (emailExists) {
    //   return res.status(400).json({ msg: 'Email already registered.' });
    // }
    // else if (usernameExists) {
    //   return res.status(400).json({ msg: 'Username not available.' });
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pword, salt);
    const guid = uuidv4();
    const verificationToken = uuidv4();
    const verificationTokenExpires = Date.now() + 24 * 3600000; // 1 hour
    const isVerified = false;
    const xUserName = username === '' ? email : username;

    const user = new UserLocal({
      guid,
      username: xUserName,
      firstName,
      lastName,
      email,
      salt,
      hashedPassword,
      isVerified,
      verificationToken,
      verificationTokenExpires
    });

    isDevelopment && console.log('\n*** [register-handler] \nuser:', user);

    const result = await user.save();

    if (result) {
      isDevelopment && console.log('\n*** [register-handler] \nresult:', result);
      const text = 'Account created. Please check your email for verification link. If you do not receive an email, please check your spam folder. The link will expire in 24 hours.';
      const path = PATH;
      const sgResponse = await sendVerificationEmail(email, guid, verificationToken, origin, path);
      isDevelopment && console.log('\n*** [register-handler] \nsgResponse:', sgResponse);
      res.status(201).json({ redirect: '/', text });
    } else {
      throw new Error('User not created! Rejected by database.')
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(String(err));
    }
    res.status(500).send('Server Error');
  }
}

export default handler;