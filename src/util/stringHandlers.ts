import { QueryData, MultiChoiceQueryData, Question, Questions, MultiChoiceQuestion, MultiChoiceQuestions } from './types';

/**
 * Creates the query string to be sent to OpenAI API.
 *
 * @param {QueryData} query - The query data.
 * @return {*} - The query string.
 */
const createQueryString = (query: QueryData) => {
  const noQuestions = (!query?.amount || query.amount === -1) ? 5 : query.amount;
  const subject = (!query?.subject || query.subject === '') ? 'General knowledge' : query.subject;

  // return `Create a quiz with ${query.amount} questions separated by '--' on the subject of ${query.subject}. Provide answers after all questions under the headline of Answers:.`;
  return `Create a quiz with ${noQuestions} questions and answers on the subject of ${subject}, no numbering. Format: [Q: question,  A: answer]`;
}

/**
 * Creates the query string to be sent to OpenAI API. This is for multiple choice questions.
 *
 * @param {QueryData} query - The query data.
 * @param {number} alternatives - The number of alternatives.
 * @return {*} - The query string.
 */
const createMultipleChoiceQueryString = (query: MultiChoiceQueryData) => {
  const noQuestions = (!query?.amount || query.amount === -1) ? 5 : query.amount;
  const subject = (!query?.subject || query.subject === '') ? 'General knowledge' : query.subject;
  const choices = (!query?.choices || query.choices < 3 || query.choices > 5) ? 3 : query.choices;

  return `Create a quiz with ${noQuestions} questions separated by '--' on the subject of ${subject} with ${choices} alternative answers. Provide right answers after all questions under the headline of Answers:.`;
  // const tmp = "Create a quiz with 10 multiple choice questions, 5 choices separated by '&&', right answer first on the subject of History, no numbering, no line breaks.  [Q: question, C: Choices, A: answer]";
}

/**
 * Decodes the response from OpenAI API.
 *
 * @param {string} response - The response from OpenAI API.
 * @return {*}  {QueryResponse} - The decoded response.
 */
const decodeResponseData = (response: string) => {
  console.log('\n*** [decodeResponseData] \nresponse:', response);
  const qAndA = response.split('Q:');

  const questions: Questions = {questions: [], subject: ''};

  console.log('\n*** [decodeResponseData] \nqAndA:', qAndA);

  qAndA.forEach((question, index) => {
    if(question.trim().length > 0) {
      const tmp = question.split('A:');
      // if (index < 3) console.log('\n*** [decodeResponseData] \ntmp:', tmp, '\ntmp[0]:', tmp[0], '\ntmp[1]:', tmp[1]);
      questions.questions.push({question: tmp[0].trim(), answer: tmp[1].trim()});
    }
  });
  
  // console.log('\n*** [decodeResponseData] \nquestions:', questions);

  return {questions};

}

export { createQueryString, createMultipleChoiceQueryString, decodeResponseData };