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
import { Quiz, IQuiz } from '../../../../src/util/model/quiz';

describe('Quiz Model Test', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it('create & save quiz successfully', async () => {
        const quizData: IQuiz = new Quiz({
            name: "Test Quiz",
            user_guid: "TestUser1",
            question_ids: [new mongoose.Types.ObjectId().toHexString(), new mongoose.Types.ObjectId().toHexString()],
            public: true,
        });
        const savedQuiz = await quizData.save();

        expect(savedQuiz._id).toBeDefined();
        expect(savedQuiz.name).toBe(quizData.name);
        expect(savedQuiz.user_guid).toBe(quizData.user_guid);
        expect(savedQuiz.question_ids).toEqual(expect.arrayContaining(quizData.question_ids));
        expect(savedQuiz.public).toBe(quizData.public);
    });

    it('insert quiz successfully, but the field not defined in schema should be undefined', async () => {
        const quizWithInvalidField = new Quiz({
            name: "Test Quiz",
            user_guid: "TestUser1",
            public: true,
            undefinedField: "Undefined Field",
        } as any);
        const savedQuizWithInvalidField = await quizWithInvalidField.save();
        const savedObject: any = savedQuizWithInvalidField.toObject();
        expect(savedQuizWithInvalidField._id).toBeDefined();
        expect(savedObject['undefinedField']).toBeUndefined();
    });



    it('create quiz without required field should fail', async () => {
        const quizWithoutRequiredField = new Quiz({
            name: "Test Quiz",
        });
        let err: mongoose.Error.ValidationError | null = null;
        try {
            await quizWithoutRequiredField.save();
        } catch (error) {
            err = error as mongoose.Error.ValidationError;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err?.errors.user_guid).toBeDefined();
    });

    // Modify quiz
    it('update quiz successfully', async () => {
        const quizData: IQuiz = new Quiz({
            name: "Test Quiz",
            user_guid: "TestUser1",
            question_ids: [new mongoose.Types.ObjectId().toHexString(), new mongoose.Types.ObjectId().toHexString()],
            public: true,
        });

        const savedQuiz = await quizData.save();
        savedQuiz.name = "Modified Quiz";
        const updatedQuiz = await savedQuiz.save();

        expect(updatedQuiz._id).toBeDefined();
        expect(updatedQuiz.name).toBe("Modified Quiz");
        expect(updatedQuiz.user_guid).toBe(quizData.user_guid);
        expect(updatedQuiz.question_ids).toEqual(expect.arrayContaining(quizData.question_ids));
        expect(updatedQuiz.public).toBe(quizData.public);
    });

    // Retrieve quiz
    it('retrieve quiz successfully', async () => {
        const quizData: IQuiz = new Quiz({
            name: "Test Quiz",
            user_guid: "TestUser1",
            question_ids: [new mongoose.Types.ObjectId().toHexString(), new mongoose.Types.ObjectId().toHexString()],
            public: true,
        });

        const savedQuiz = await quizData.save();
        const retrievedQuiz = await Quiz.findById(savedQuiz._id);

        expect(retrievedQuiz).not.toBeNull();
        expect(retrievedQuiz!.name).toBe(savedQuiz.name);
        expect(retrievedQuiz!.user_guid).toBe(savedQuiz.user_guid);
        expect(retrievedQuiz!.question_ids).toEqual(expect.arrayContaining(savedQuiz.question_ids));
        expect(retrievedQuiz!.public).toBe(savedQuiz.public);
    });

    // Delete quiz
    it('delete quiz successfully', async () => {
        const quizData: IQuiz = new Quiz({
            name: "Test Quiz",
            user_guid: "TestUser1",
            question_ids: [new mongoose.Types.ObjectId().toHexString(), new mongoose.Types.ObjectId().toHexString()],
            public: true,
        });

        const savedQuiz = await quizData.save();
        await Quiz.findByIdAndDelete(savedQuiz._id);
        const retrievedQuiz = await Quiz.findById(savedQuiz._id);

        expect(retrievedQuiz).toBeNull();
    });
});
