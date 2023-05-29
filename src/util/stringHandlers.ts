import { QueryData, MultiChoiceQueryData, Questions, MultiChoiceQuestion, MultiChoiceQuestions } from './types';

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Creates the query string to be sent to OpenAI API.
 *
 * @param {QueryData} query - The query data.
 * @return {*} - The query string.
 */
const createQueryString = (query: QueryData) => {
  const noQuestions = (!query?.amount || query.amount === -1) ? 5 : query.amount;
  const subject = (!query?.subject || query.subject === '') ? 'General knowledge' : query.subject;

  isDevelopment && console.log('\n*** [stringHandlers - createQueryString] \nquery:', query, '\nnoQuestions:', noQuestions, '\nsubject:', subject);

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
  const choices = (!query?.numbOfMultiChoice || query.numbOfMultiChoice < 3 || query.numbOfMultiChoice > 5) ? 3 : query.numbOfMultiChoice;

  isDevelopment && console.log('\n*** [stringHandlers - createMultipleChoiceQueryString] \nquery:', query, '\nnoQuestions:', noQuestions, '\nsubject:', subject, '\nchoices:', choices);

  return `Create a multi-choice quiz with ${noQuestions} questions each with ${choices} choices on the subject of ${subject}, no numbering. Format: [Q: question,  C: choices [lower case separator:','], A: answer]`
}

/**
 * Decodes the response from OpenAI API.
 *
 * @param {string} response - The response from OpenAI API.
 * @return {*}  {QueryResponse} - The decoded response.
 */
const decodeResponseData = (response: string) => {
  isDevelopment && console.log('\n*** [stringHandlers - decodeResponseData] \nresponse:', response);
  const qAndA = response.split('Q:');

  const questions: Questions = { questions: [], subject: '' };

  console.log('\n*** [stringHandlers - decodeResponseData] \nqAndA:', qAndA);

  qAndA.forEach((question) => {
    if (question.trim().length > 0) {
      const tmp = question.split('A:');
      // if (index < 3) console.log('\n*** [decodeResponseData] \ntmp:', tmp, '\ntmp[0]:', tmp[0], '\ntmp[1]:', tmp[1]);
      questions.questions.push({ question: tmp[0].trim(), answer: tmp[1].trim() });
    }
  });

  isDevelopment && console.log('\n*** [stringHandlers - decodeResponseData] \nquestions:', questions);

  return { questions };

}

const decodeMultiChoiceResponseData = (response: string) => {
  isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \nresponse:', response);

  const qAndA = response.split('Q:');
  const questions: MultiChoiceQuestions = { questions: [], subject: '' };

  qAndA.forEach((q, index) => {
    const question: MultiChoiceQuestion = { question: '', choices: [''], answer: '' };
    isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \nindex:', index, '\nq:', q);

    try {
      const qNa = q.split('A:');
      const pattern = /^[a-z][):.]/i;
      isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \nqNa:', qNa);
      const qNc = qNa[0].split('C:');
      isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \nqNc:', qNc);
      const choices: Array<string> = [];
      if (Number(index) > 0) {
        question.question = qNc[0].trim();
        const tmp = qNc[1].split(',');
        for (let i = 0; i < tmp.length; i++) {
          isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \ni:', i, '\ntmp[i]:', tmp[i]);
          choices.push(tmp[i].replace(pattern, '').trim().replace(/\b\w/g, match => match.toUpperCase()));
        }
        question.choices = choices;
        question.answer = qNa[1].trim().replace(/\b\w/g, match => match.toUpperCase());
        isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \nindex:', index, '\nquestion:', question);
        questions.questions.push(question);
      }
    } catch (err: unknown) {
      console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \nerr:', err);
    }
  });

  isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \nquestions:', questions);

  return { questions };
}

export { createQueryString, createMultipleChoiceQueryString, decodeResponseData, decodeMultiChoiceResponseData };