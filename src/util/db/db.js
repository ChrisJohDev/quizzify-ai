/**
 * Database configuration.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>  (https://chrisjohannesson.com)
 * @version 1.0.0
 */

import mongoose from 'mongoose'

const url = process.env.ATLAS_AUTH_CONNECTION || 'mongodb://localhost:27017'

/**
 * Connect to the database.
 *
 * @returns {Promise} The connection promise.
 * @throws {Error} If the connection fails.
 */
export const connectDB = async () => {
  try {
    const { connection } = mongoose
    connection.on('connected', () => { console.log('Connected to MongoDB') })
    connection.on('error', (err) => { console.error(`DB connection error: ${err}`) })
    connection.on('disconnected', () => { console.log('Disconnected from MongoDB') })

    // Close the connection when the application is terminated
    process.on('SIGINT', () => {
      connection.close(() => {
        console.log('Disconnected from MongoDB')
        process.exit(0)
      })
    })

    // console.log('\n *** [db.js] connectDB url:', url)

    // Connect to the database
    return await mongoose.connect(url)
  } catch (err) {
    console.error(err)
    throw new Error('Failed to connect to the database')
  }
}
