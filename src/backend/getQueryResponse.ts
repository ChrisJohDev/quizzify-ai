import { Configuration, OpenAIApi } from "openai";
import { QueryData, QueryResponse } from '@/util/types';
import { create } from "domain";


// For testing purposes only. Set to false to use OpenAI API.
const MOCK_RESPONSE = false;
const mockResponse = `1. When did the American Civil War take place?
--
2. Who was the first president of the United States?
--
3. What was the name of the first civilization to emerge in Mesopotamia?
--
4. Who was the leader of Nazi Germany during World War II?
--
5. What was the name of the first man to walk on the moon?
--
6. Who was the first female Prime Minister of the United Kingdom?
--
7. In what year did the United States declare its independence from Great Britain?  
--
8. Who was the leader of the Soviet Union during the Cuban Missile Crisis?
--
9. What was the name of the ancient Egyptian writing system?
--
10. Who was the Roman general who famously crossed the Alps with his army in 218 BC?
--

Answers:
1. 1861-1865
2. George Washington
3. Sumerians
4. Adolf Hitler
5. Neil Armstrong
6. Margaret Thatcher
7. 1776
8. Nikita Khrushchev
9. Hieroglyphics
10. Hannibal
`;

/** @type {*} */
const configuration = new Configuration({
  // cspell: disable-next-line
  organization: "org-dMNPBvDst81fpwfcz8Fhj1b2",
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Creates the query string to be sent to OpenAI API.
 *
 * @param {QueryData} query - The query data.
 * @return {*} - The query string.
 */
const createQueryString = (query: QueryData) => {
  const noQuestions = (!query?.amount || query.amount === -1) ? 5 : query.amount;
  const subject = (!query?.subject || query.subject === '') ? 'General knowledge' : query.subject;

  return `Create a quiz with ${query.amount} questions separated by '--' on the subject of ${query.subject}. Provide answers after all questions under the headline of Answers:.`;
}

/**
 * Creates the query string to be sent to OpenAI API. This is for multiple choice questions.
 *
 * @param {QueryData} query - The query data.
 * @param {number} alternatives - The number of alternatives.
 * @return {*} - The query string.
 */
const createMultipleChoiceQueryString = (query: QueryData, alternatives?: number) => {
  const noQuestions = (!query?.amount || query.amount === -1) ? 5 : query.amount;
  const subject = (!query?.subject || query.subject === '') ? 'General knowledge' : query.subject;
  const choices = (!alternatives || alternatives < 3 || alternatives > 5) ? 3 : alternatives;

  return `Create a quiz with ${noQuestions} questions separated by '--' on the subject of ${subject} with ${choices} alternative answers. Provide right answers after all questions under the headline of Answers:.`;
}

/**
 * Decodes the response from OpenAI API.
 *
 * @param {string} response - The response from OpenAI API.
 * @return {*}  {QueryResponse} - The decoded response.
 */
const decodeResponse = (response: string): QueryResponse => {
  const qAndA = response.split('Answers:');
  const questions = qAndA[0].split('--');
  const answers = qAndA[1];

  return {questions, answers};

}
/**
 * Gets the Mockup response. No calls to OpenAI API.
 *
 * @return {*}  {Promise<QueryResponse>} - The Mockup response.
 */
const getQueryResponseMockup = async (): Promise<QueryResponse> => {
  let responseData: QueryResponse = {
    questions: [],
    answers: ""
  };

  responseData = decodeResponse(mockResponse);

  return responseData;
}

/**
 * Gets the response from OpenAI API.
 *
 * @param {QueryData} query - The query data.
 * @return {*}  {Promise<QueryResponse>} - The response from OpenAI API.
 */
const getQueryResponse = async (query: QueryData): Promise<QueryResponse> => {
  // const openai = new OpenAIApi(configuration);
  // const response = await openai.listEngines();
  const openai = new OpenAIApi(configuration);

  let responseData: QueryResponse = {
    questions: [],
    answers: ""
  };
  const queryString = createQueryString(query);

  if (!MOCK_RESPONSE) {
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: queryString }],
      temperature: 0.7,
    };
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseJson = await response.json();

    responseData = decodeResponse(responseJson.choices[0].message.content); 
    
  } else {
    responseData = decodeResponse(mockResponse)
  }

  return responseData;
}

export default getQueryResponse;
export { getQueryResponseMockup };