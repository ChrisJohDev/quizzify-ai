/**
 * Project Name: Quizzify-AI
 * 
 * Database connection.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import mongoose from 'mongoose'

const isDevelopment = process.env.NODE_ENV === 'development';

const url = process.env.ATLAS_AUTH_CONNECTION || 'mongodb://localhost:27017'
const connection = {};

/**
 * Connects to a MongoDB database using Mongoose.
 * Also checks so that the connection is not already established. 
 * If it is, it will use the existing connection.
 *
 * @return {*} 
 */
async function connectDB() {
  isDevelopment &&  console.log('\n *** [db.js] connectDB url:', url, '\nNODE_ENV:', process.env.NODE_ENV, '\nATLAS_AUTH_CONNECTION:', process.env.ATLAS_AUTH_CONNECTION);
  if (connection.isConnected) {
    console.log('\n*** [db.js] Using existing database connection');
    // Use existing database connection
    return;
  }

  try {
    const db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectDB;
