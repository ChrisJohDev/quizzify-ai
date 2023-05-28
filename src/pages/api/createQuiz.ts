import { NextApiRequest, NextApiResponse } from "next";
import { createQueryString, decodeResponseData } from "@/util/stringHandlers";
import { mockResponseApiData2, mockResponseApiDataMultiChoice } from "@/util/mockData";

// export const config = {
//   runtime: 'edge'
// }

/** @type {*} */
// const configuration = new Configuration({
//   // cspell: disable-next-line
//   organization: "org-dMNPBvDst81fpwfcz8Fhj1b2",
//   apiKey: process.env.OPENAI_API_KEY,
// });

const isDevelopment = process.env.NODE_ENV === 'development';
const MOCK_RESPONSE = true;

// async function getRequestBody(req: NextApiRequest): Promise<QueryData> {
//   return new Promise((resolve, reject) => {
//     let data = '';
//     req.on('data', (chunk: any) => {
//       data += chunk;
//     });
//     req.on('end', () => {
//       try {
//         const body = querystring.parse(data);
//         resolve({subject: body.subject, amount: body.amount});
//       } catch (error) {
//         reject(error);
//       }
//     });
//     req.on('error', (error: any) => {
//       reject(error);
//     });
//   });
// }



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('\n*** [createQuiz-handler] -');
  const body = await req.body;

  isDevelopment && console.log('\n*** [createQuiz-handler] \nbody:', body);

  const queryString = createQueryString(body);

  isDevelopment && console.log('\n*** [createQuiz-handler] \ndata:', body, '\nqueryString:', queryString);

  if(MOCK_RESPONSE){
    const response = mockResponseApiData2;

    const decodedResponse = decodeResponseData(response);

    console.log('\n*** [createQuiz-handler] \nresponse:', response, '\ndecodedResponse:', decodedResponse);

    // console.log('\n*** [createQuiz-handler] \nres:', res)
    res.status(200).json({response: decodedResponse});
  }

  try{
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

    console.log('\n*** [createQuiz-handler] \nresponse:', response);

    const responseJson = await response.json();
    console.log('\n*** [createQuiz-handler] \nresponseJson:', responseJson.choices[0].message.content);

    const decodedResponse = decodeResponseData(responseJson.choices[0].message.content);

    console.log('\n*** [createQuiz-handler] \nrequestBody:', requestBody,'\nresponseJson:', responseJson);
    
    res.status(200).json({response: decodedResponse});
  } catch (err) {
    console.error('\n*** [createQuiz-handler] err:', err);
  }
 
  
}

export default handler;