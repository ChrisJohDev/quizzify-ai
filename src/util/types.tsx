export type QueryData = {
  subject: string | any,
  amount: number | any
}

export type MultiChoiceQueryData = {
  subject: string | any,
  amount: number | any,
  choices: number | any 
}

export type QueryResponse = {
  questions: Array<string>,
  answers: string,
}

export type Question = {
  question: string,
  answer: string,
}

export type Questions = Array<Question>;

export type MultiChoiceQuestion = {
  question: string,
  choices: Array<string>,
  answer: string,
}

export type MultiChoiceQuestions = Array<MultiChoiceQuestion>;