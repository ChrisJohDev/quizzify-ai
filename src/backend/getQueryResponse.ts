import { Configuration, OpenAIApi } from "openai";
import { QueryData, QueryResponse } from '@/util/types';
import { create } from "domain";

const configuration = new Configuration({
  organization: "org-dMNPBvDst81fpwfcz8Fhj1b2",
  apiKey: process.env.OPENAI_API_KEY,
});

const MOCK_RESPONSE = true;
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

const createQueryString = (query: QueryData) => {
  const noQuestions = (!query?.amount || query.amount === -1) ? 5 : query.amount;
  const subject = (!query?.subject || query.subject === '') ? 'General knowledge' : query.subject;

  return `Create a quiz with ${noQuestions} questions separated by '--' on the subject of ${subject} with 3 alternative answers. Provide right answers after all questions under the headline of Answers:.`;

  // return `Create a quiz with ${query.amount} questions separated by '--' on the subject of ${query.subject}. Provide answers after all questions under the headline of Answers:.`;
}

const decodeResponse = (response: string): QueryResponse => {
  const qAndA = response.split('Answers:');
  const questions = qAndA[0].split('--');
  const answers = qAndA[1];

  return {questions, answers};

}


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