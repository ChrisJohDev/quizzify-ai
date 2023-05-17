import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { connectDB } from '@/util/db/db';
// import User from '@/util/model/user';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';


connectDB();

const isDevelopment = true;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('\n*** [register-handler] -');
  const { username, firstName, lastName, email, pword, confirm_pword } = req.body;

  isDevelopment && console.log('\n*** [register-handler] \nusername:', username, '\nfirstName:', firstName, '\nlastName:', lastName, '\nemail:', email, '\npword:', pword, '\nconfirm_pword:', confirm_pword );

  try {
    const User = mongoose.model('User');

    const userExists = await User.findOne({ email });
    // const userExists = false;

    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pword, salt);
    const guid = uuidv4();

    const user = new User({
      guid,
      username,
      firstName,
      lastName,
      email,
      salt,
      hashedPassword
    });

    console.log('\n*** [register-handler] \nuser:', user);

    const result = await user.save()

      if (result) {
        // res.set('Content-Type', 'application/json')
        // res.set('Media-Type', 'application/json')
        console.log('\n*** [register-handler] \nresult:', result);
      } else {
        throw new Error('User not created! Rejected by database.')
      }

      // res.status(201).json({ id: result._id })
      res.status(200).json({ msg: 'User created successfully!' })
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  } finally{
    console.log('\n*** [register-handler] - finally');

  }
}

export default handler;