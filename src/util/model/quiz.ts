/**
 * Project Name: Quizzify-AI
 *
 * Mongoose schema for the user model.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../types'; // Import IUser from user.ts
import { IQuestion } from './question'; // Import IQuestion from question.ts

interface IQuiz extends Document {
    name: string;
    user_guid: IUser['guid'];
    question_ids: IQuestion['_id'][];
    public: boolean;
}

const QuizSchema = new Schema<IQuiz>({
  name: { type: String, required: true },
  user_guid: { type: String, ref: 'User', required: true },
  question_ids: { type: [Schema.Types.ObjectId], ref: 'Question', default: [] },
  public: { type: Boolean, default: false }
});

const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);

export { Quiz }; export type { IQuiz };
