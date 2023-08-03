/**
 * Project Name: Quizzify-AI
 *
 * Contains types used throughout the application.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import { ImageProps } from 'next/image';
import { Document } from 'mongoose';

export type QueryData = {
  subject: string | never,
  amount: number | never
}

export type MultiChoiceQueryData = {
  subject: string | never,
  amount: number | never,
  numbOfMultiChoice: number | never
}

export type QueryResponse = {
  questions: Array<string>,
  answers: string,
}

export type Question = {
  question: string,
  answer: string,
}

export type Questions = {
  subject: string,
  questions: Array<Question>
};

export type MultiChoiceQuestion = {
  question: string,
  choices: Array<string>,
  answer: string,
}

export type MultiChoiceQuestions = {questions: Array<MultiChoiceQuestion>, subject: string};

export interface IInputErrors {
  [key: string]: string;
}
// eslint-disable-next-line no-unused-vars
export enum MultiChoice {
  // eslint-disable-next-line no-unused-vars
  a = 0,
  // eslint-disable-next-line no-unused-vars
  b = 1,
  // eslint-disable-next-line no-unused-vars
  c = 2,
  // eslint-disable-next-line no-unused-vars
  d = 3,
  // eslint-disable-next-line no-unused-vars
  e = 4
}

/**
 * LogoProps type declaration.
 */
export type LogoProps = ImageProps & {
  className?: string;
  width?: number;
  height?: number;
}

export interface IUser extends Document {
  id: string;
  guid: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  salt: string;
  hashedPassword: string; // hashed password
  isVerified: boolean; // true if the user is verified, otherwise false
  verificationToken: string; // the verification token
  verificationTokenExpires: number; // the verification token expiration
  resetPasswordToken: string; // the reset password token
  role: string; // can be 'user' or 'admin'
  image?: string; // the user's image if applicable
}
