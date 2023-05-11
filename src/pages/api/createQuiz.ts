import { NextApiRequest, NextApiResponse } from "next";
import * as querystring from "querystring";
import getQueryResponse, {getQueryResponseMockup} from "@/backend/getQueryResponse";
import { QueryData } from '@/util/types';


async function getRequestBody(req: any) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        const body = querystring.parse(data);
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', (error: any) => {
      reject(error);
    });
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('\n*** [createQuiz-handler] -');
  const body = req.body;
  const data: QueryData = {
    subject: body.subject,
    amount: body.amount
  }

  console.log('\n*** [createQuiz-handler] body:', body);
  console.log('\n*** [createQuiz-handler] data:', data);
 
  res.status(200).json({data});
}

export default handler;