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

export interface IUser {
  id: string,
  username?: string,
  email?: string,
  guid: string,
  firstName?: string,
  lastName?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any,
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