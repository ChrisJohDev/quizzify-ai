import { NextApiRequest, NextApiResponse } from "next";
import { createQueryString, decodeResponseData, createMultipleChoiceQueryString, decodeMultiChoiceResponseData } from "@/util/stringHandlers";
import { mockResponseApiData2, mockResponseApiDataMultiChoice } from "@/util/mockData";



const isDevelopment = process.env.NODE_ENV === 'development';
const MOCK_RESPONSE = true;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  isDevelopment && console.log('\n*** [createQuiz-handler] -');
  const body = await req.body;
  const isMultiChoice = body.multiChoice;

  isDevelopment && console.log('\n*** [createQuiz-handler] \nbody:', body, '\nisMultiChoice:', isMultiChoice);

  const queryString = isMultiChoice ? createMultipleChoiceQueryString(body) : createQueryString(body);

  isDevelopment && console.log('\n*** [createQuiz-handler] \nqueryString:', queryString);

  if (MOCK_RESPONSE && !isMultiChoice) {
    const response = mockResponseApiData2;

    const decodedResponse = decodeResponseData(response);

    console.log('\n*** [createQuiz-handler] \nresponse:', response, '\ndecodedResponse:', decodedResponse);

    // console.log('\n*** [createQuiz-handler] \nres:', res)
    res.status(200).json({ response: decodedResponse });
  }
  if (MOCK_RESPONSE && isMultiChoice) {

    const response = mockResponseApiDataMultiChoice;

    const decodedResponse = decodeMultiChoiceResponseData(response);

    isDevelopment && console.log('\n*** [createQuiz-handler - multiChoice] \nresponse:', response, '\ndecodedResponse:', decodedResponse);

    res.status(200).json({ response: decodedResponse });
  }

  if (!MOCK_RESPONSE) {
    try {
      const requestBody = {
        model: 'gpt-3.5-turbo',
        // model:'gpt-4',
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

      // console.log('\n*** [createQuiz-handler] \nresponse:', response);

      const responseJson = await response.json();
      console.log('\n*** [createQuiz-handler] \nresponseJson.choices[0].message.content:', responseJson.choices[0].message.content);

      const decodedResponse = isMultiChoice 
      ? decodeMultiChoiceResponseData(responseJson.choices[0].message.content)
      : decodeResponseData(responseJson.choices[0].message.content);

      console.log('\n*** [createQuiz-handler] \ndecodedResponse:', String(decodedResponse));

      res.status(200).json({ response: decodedResponse });
    } catch (err) {
      console.error('\n*** [createQuiz-handler] err:', err);
      res.status(500).json({ response: err });
    }
  }

}

export default handler;