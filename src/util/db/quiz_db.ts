/**
 * Project Name: Quizzify-AI
 *
 * Database connection.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import mongoose, { Mongoose } from 'mongoose';

const url = process.env.ATLAS_QUIZ_CONNECTION || 'mongodb://localhost:27017';

/**
 *
 */
class DBConnection {
  private isConnected: boolean;

  /**
   * Creates an instance of DBConnection.
   */
  constructor () {
    this.isConnected = false;
  }

  /**
   * Connects to the database.
   */
  async connect (): Promise<void> {
    if (this.isConnected) {
      console.log('\n*** [dbConnection.ts] Using existing database connection');
      return;
    }

    try {
      const db: Mongoose = await mongoose.connect(url);
      this.isConnected = db.connections[0].readyState === 1;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  /**
   * Disconnects from the database.
   *
   * @returns {Promise<void>} - a promise.
   */
  getConnectionStatus (): boolean {
    return this.isConnected;
  }
}

export default DBConnection;
