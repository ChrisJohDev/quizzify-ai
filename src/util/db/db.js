/**
 * Database configuration.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>  (https://chrisjohannesson.com)
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const url = process.env.ATLAS_AUTH_CONNECTION || 'mongodb://localhost:27017'
const connection = {};

async function connectDB() {
  // console.log('\n *** [db.js] connectDB url:', url);
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

// let cached = global.mongoose;

// if(!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// /**
//  * Connect to the database.
//  *
//  * @returns {Promise} The connection promise.
//  * @throws {Error} If the connection fails.
//  */
// export const connectDB = async () => {
//   try {
//     if (cached.conn) {
//       return cached.conn;
//     }

//     if (!cached.promise) {
//       const opts = {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         bufferCommands: false,
//       };

//       // cached.promise = mongoose.connect(url, opts).then((mongoose) => {
//       //   return mongoose;
//       // });

//       cached.promise = mongoose.connect(url, opts).then((mongoose) => {
//         // console.log("\n *** [connectDB] Mongoose instance:", mongoose);  // <- Added line
//         return mongoose;
//       }).catch(err => {  // <- Added line
//         console.error("\n *** [connectDB] Error during mongoose.connect:", err);  // <- Added line
//         throw err;  // <- Added line
//       });
//     }

//     cached.conn = await cached.promise;
//     // console.log("\n *** [connectDB] Cached connection:", cached.conn);  // <- Added line

//     if (!cached.conn) {
//       throw new Error("\n *** [connectDB] Failed to establish Mongoose connection");  // <- Added line
//     }
    
//     mongoose.connection.on('connected', () => { console.log('Connected to MongoDB') });
//     mongoose.connection.on('error', (err) => { console.error(`DB connection error: ${err}`) });
//     mongoose.connection.on('disconnected', () => { console.log('Disconnected from MongoDB') });

//     return cached.conn;

//     // // Close the connection when the application is terminated
//     // process.on('SIGINT', () => {
//     //   connection.close(() => {
//     //     console.log('Disconnected from MongoDB')
//     //     process.exit(0)
//     //   });
//     // });

//     // // console.log('\n *** [db.js] connectDB url:', url)

//     // // Connect to the database
//     // return await mongoose.connect(url);
//   } catch (err) {
//     console.error(err);
//     throw new Error('\n *** [connectDB] Failed to connect to the database');
//   }
// }
