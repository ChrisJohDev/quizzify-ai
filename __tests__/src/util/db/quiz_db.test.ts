/**
 * Project Name: Quizzify-AI
 * 
 * Database connection.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import mongoose, { Mongoose } from 'mongoose';
import DBConnection from '../../../../src/util/db/quiz_db';

const mongooseConnect = mongoose.connect as jest.MockedFunction<typeof mongoose.connect>;

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('DBConnection', () => {
  let dbConnection: DBConnection;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    dbConnection = new DBConnection();

    // Setup
    mongooseConnect.mockClear();
    consoleLogSpy = jest.spyOn(console, 'log');
    consoleLogSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    // Cleanup
    consoleLogSpy.mockRestore();
  });

  it('should use existing connection if one exists', async () => {
    (mongooseConnect as jest.Mock).mockResolvedValue({
      connections: [{ readyState: 1 }],
    });

    // First connection
    await dbConnection.connect();

    // Second connection attempt - should use the existing connection
    await dbConnection.connect();

    expect(mongooseConnect).toBeCalledTimes(1);
    expect(consoleLogSpy).toBeCalledWith(
      '\n*** [dbConnection.ts] Using existing database connection'
    );
  });

  it('should connect to the database if no connection exists', async () => {
    (mongooseConnect as jest.Mock).mockResolvedValue({
      connections: [{ readyState: 1 }],
    });

    await dbConnection.connect();

    expect(mongooseConnect).toBeCalledTimes(1);
    expect(consoleLogSpy).toBeCalledWith('Connected to MongoDB');
  });

  it('should handle errors when connecting to the database', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    consoleErrorSpy.mockImplementation(() => {});

    const error = new Error('Connection error');
    (mongooseConnect as jest.Mock).mockRejectedValue(error);

    await dbConnection.connect();

    expect(consoleErrorSpy).toBeCalledWith('Error connecting to MongoDB:', error);

    consoleErrorSpy.mockRestore();
  });
});
