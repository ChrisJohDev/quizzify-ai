/**
 * Project Name: Quizzify-AI
 *
 * Database connection.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import mongoose from 'mongoose';

const isDevelopment = process.env.NODE_ENV === 'development';

const url = process.env.ATLAS_QUIZ_CONNECTION || 'mongodb://localhost:27017';
const connection = {};

/**
 * Connects to a MongoDB database using Mongoose.
 * Also checks so that the connection is not already established.
 * If it is, it will use the existing connection.
 *
 * @returns {*} - Returns nothing.
 */
async function connectQuizDB () {
  isDevelopment && console.log('\n *** [quiz_db.js] connectDB url:', url, '\nNODE_ENV:', process.env.NODE_ENV, '\nATLAS_QUIZ_CONNECTION:', process.env.ATLAS_QUIZ_CONNECTION);
  if (connection.isConnected) {
    console.log('\n*** [quiz_db.js] Using existing database connection');
    // Use existing database connection
    return;
  }

  try {
    const db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectQuizDB;
