import { QueryData, MultiChoiceQueryData, Questions, MultiChoiceQuestion, MultiChoiceQuestions } from './types';

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Creates the query string to be sent to OpenAI API.
 *
 * @param {QueryData} query - The query data.
 * @return {*} - The query string.
 */
const createQueryString = (query: QueryData) => {
  const noQuestions = (!query?.amount || query.amount < 1) ? 5 : (query.amount > 25) ? 25 : query.amount;
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
  const noQuestions = (!query?.amount || query.amount < 1) ? 5 : (query.amount > 25) ? 25 : query.amount;
  const subject = (!query?.subject || query.subject === '') ? 'General knowledge' : query.subject;
  const choices = (!query?.numbOfMultiChoice || query.numbOfMultiChoice < 3 ) ? 3 : (query.numbOfMultiChoice > 5) ? 5 : query.numbOfMultiChoice;

  isDevelopment && console.log('\n*** [stringHandlers - createMultipleChoiceQueryString] \nquery:', query, '\nnoQuestions:', noQuestions, '\nsubject:', subject, '\nchoices:', choices);

  return `Create a multi-choice quiz with ${noQuestions} questions each with ${choices} choices on the subject of ${subject}, no numbering. Format: [Q: question,  C: choices [separator:'<||>'], A: answer]`
}

/**
 * Decodes the response from OpenAI API.
 *
 * @param {string} response - The response from OpenAI API.
 * @return {*}  {QueryResponse} - The decoded response.
 */
const decodeResponseData = (response: string) => {
  isDevelopment && console.log('\n*** [stringHandlers - decodeResponseData] \nresponse:', response);
  const qAndA = response.split(/[qQ]:/g);

  const questions: Questions = { questions: [], subject: '' };

  console.log('\n*** [stringHandlers - decodeResponseData] \nqAndA:', qAndA);

  qAndA.forEach((question) => {
    if (question.trim().length > 0) {
      const tmp = question.split(/[aA]:/g);
      questions.questions.push({ question: tmp[0].trim(), answer: tmp[1].trim() });
    }
  });

  isDevelopment && console.log('\n*** [stringHandlers - decodeResponseData] \nquestions:', questions);

  return { questions };

}

const checkMultipleOccurrences = (str: string, pattern: string) => {
  const occurrences = str.split(pattern).length - 1;
  return occurrences > 1;
}

const decodeMultiChoiceResponseData = (response: string) => {
  isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \nresponse:', response);

  const qAndA = response.split(/Q:/g);
  const questions: MultiChoiceQuestions = { questions: [], subject: '' };

  qAndA.forEach((q, index) => {
    const question: MultiChoiceQuestion = { question: '', choices: [''], answer: '' };
    isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \nindex:', index, '\nq:', q);
    let qNa: Array<string> = [];
    let qNc: Array<string> = [];
    try {
      if (checkMultipleOccurrences(q, 'A:')) {
        qNa = splitStringOnSecondOccurrence(q, 'A:');
      } else {
        qNa = q.split('A:');
      }
      isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \nqNa:', qNa);
      if(checkMultipleOccurrences(qNa[0], 'C:')) {
        qNc = removeFirstOccurrence(qNa[0], 'C:');
      } else {  
        qNc = qNa[0].split('C:');
      }
      
      isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \nqNc:', qNc);
      const pattern = /^(?!e\.g\.|i\.e\.|[a-eA-E][.:)]\s)[a-eA-E][.:)]\s?/g;
      const choices: Array<string> = [];
      if (Number(index) > 0) {
        question.question = qNc[0].trim();
        const tmp = qNc[1].split('<||>');
        for (let i = 0; i < tmp.length; i++) {
          isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \ni:', i, '\ntmp[i]:', tmp[i]);
          const cTrimmed = tmp[i].trim().replace(pattern, '');
          isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \ncTrimmed:', cTrimmed);
          // const cFinal = cTrimmed.replace(/\b\w/g, match => match.toUpperCase().trim()); // capitalize first letter of choice. NOT needed anymore.
          const cFinal = cTrimmed;
          isDevelopment && console.log('\n*** [stringHandlers - decodeMultiChoiceResponseData] \ncFinal:', cFinal);
          choices.push(cFinal);
        }
        question.choices = choices;
        // question.answer = qNa[1].trim().replace(/\b\w/g, match => match.toUpperCase()); // capitalize first letter of answer. NOT needed anymore.
        question.answer = qNa[1].trim();
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


const removeFirstOccurrence = (q: string, pattern: string): string[] => {
  const index = q.indexOf(pattern);
  const firstPart = q.slice(0, index);
  const secondPart = q.slice(index + pattern.length);
  console.log('\n*** [stringHandlers - removeFirstOccurrence] \nfirstPart:', firstPart, '\nsecondPart:', secondPart);
    return [q.slice(0, index), q.slice(index + pattern.length)]; 
}

const splitStringOnSecondOccurrence = (q: string, pattern: string): string[] => {
  
  const index1 = q.indexOf(pattern);
  const index2 = q.indexOf(pattern, index1 + 1);

  return [q.slice(0, index2), q.slice(index2 + pattern.length)];
}
