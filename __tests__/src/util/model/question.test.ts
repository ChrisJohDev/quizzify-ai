/**
 * Project Name: Quizzify-AI
 *
 * Database connection.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Question } from '../../../../src/util/model/question'; // import the Question model

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const mongoURI = mongod.getUri();
  await mongoose.connect(mongoURI);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongod.stop();
});

describe('Question Model Test', () => {
    const questionData = {
        question: 'What is 2 + 2?',
        user_guid: 'a1b2c3d4e5f6',
        tags: ['math', 'basic'],
        choices: ['2', '3', '4', '5'],
        correctAnswer: '4',
      };

  it('should create & save question successfully', async () => {
    
    const validQuestion = new Question(questionData);
    const savedQuestion = await validQuestion.save();

    expect(savedQuestion._id).toBeDefined();
    expect(savedQuestion.question).toBe(questionData.question);
    expect(savedQuestion.user_guid).toBe(questionData.user_guid);
    expect(savedQuestion.tags).toEqual(expect.arrayContaining(questionData.tags));
    expect(savedQuestion.choices).toEqual(expect.arrayContaining(questionData.choices));
    expect(savedQuestion.correctAnswer).toBe(questionData.correctAnswer);
  });

  it('should retrieve a question successfully', async () => {
    const validQuestion = new Question(questionData);
    const savedQuestion = await validQuestion.save();
    const foundQuestion = await Question.findById(savedQuestion._id);

    expect(foundQuestion).toBeDefined();
    expect(foundQuestion?.question).toBe(savedQuestion.question);
    expect(foundQuestion?.user_guid).toBe(savedQuestion.user_guid);
    expect(foundQuestion?.tags).toEqual(expect.arrayContaining(savedQuestion.tags));
    expect(foundQuestion?.choices).toEqual(expect.arrayContaining(savedQuestion.choices));
    expect(foundQuestion?.correctAnswer).toBe(savedQuestion.correctAnswer);
  });

  it('should update a question successfully', async () => {
    const validQuestion = new Question(questionData);
    const savedQuestion = await validQuestion.save();

    const newQuestion = 'What is 3 + 3?';
    savedQuestion.question = newQuestion;
    const updatedQuestion = await savedQuestion.save();

    expect(updatedQuestion).toBeDefined();
    expect(updatedQuestion.question).toBe(newQuestion);
  });

  it('should delete a question successfully', async () => {
    const validQuestion = new Question(questionData);
    const savedQuestion = await validQuestion.save();
    await Question.findByIdAndDelete(savedQuestion._id);

    const deletedQuestion = await Question.findById(savedQuestion._id);
    expect(deletedQuestion).toBeNull();
  });

  it('should not save a question without required field', async () => {
    const invalidQuestionData = {
      question: 'What is 2 + 2?',
      user_guid: 'a1b2c3d4e5f6',
      tags: ['math', 'basic'],
      choices: ['2', '3', '4', '5'],
    };
    const invalidQuestion = new Question(invalidQuestionData);
    let err: mongoose.Error.ValidationError | null = null;
    try {
      await invalidQuestion.save();
    } catch (error) {
      err = error as mongoose.Error.ValidationError;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err?.errors.correctAnswer).toBeDefined();
  });

  it('should ignore undefined schema fields', async () => {
    const questionDataWithInvalidField = {
      question: 'What is 2 + 2?',
      user_guid: 'a1b2c3d4e5f6',
      tags: ['math', 'basic'],
      choices: ['2', '3', '4', '5'],
      correctAnswer: '4',
      invalidField: 'I am invalid',
    } as any;
    const questionWithInvalidField = new Question(questionDataWithInvalidField);
    const savedQuestionWithInvalidField: any = await questionWithInvalidField.save();

    expect(savedQuestionWithInvalidField._id).toBeDefined();
    expect(savedQuestionWithInvalidField.invalidField).toBeUndefined();
  });
});
