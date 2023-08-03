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

interface IQuestion extends Document {
    question: string;
    user_guid: IUser['guid'];
    tags: string[];
    choices: string[];
    correctAnswer: string;
}

const QuestionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  user_guid: { type: String, ref: 'User', required: true },
  tags: { type: [String], default: [] },
  choices: { type: [String], required: false },
  correctAnswer: { type: String, required: true }
});

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);

export { Question }; export type { IQuestion };
