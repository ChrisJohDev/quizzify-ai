export type QueryData = {
  subject: string | never,
  amount: number | never
}

export type MultiChoiceQueryData = {
  subject: string | never,
  amount: number | never,
  choices: number | never 
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
  id?: string,
  username?: string,
  email?: string,
  guid: string,
  firstName?: string,
  lastName?: string,
  [key: string]: any,
}

export type MultiChoiceQuestions = Array<MultiChoiceQuestion>;

export interface IInputErrors {
  [key: string]: string;
}