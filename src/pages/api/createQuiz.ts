import { NextApiRequest, NextApiResponse } from "next";
import { QueryData } from '../quizResponse';

// interface QuizRequest extends NextApiRequest {
//   body: {
//     FormData: {
//       subject: string,
//       amount: number,
//     }
//   }
// };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('\n*** [createQuiz-handler] -');
  const body = req.body;
  const data: QueryData = {
    subject: body.subject,
    amount: body.amount
  }

  console.log('\n*** [createQuiz-handler] body:', body);
  // const data = await openai.ChatCompletion.create({
  //   model: "davinci",
  //   messages: [
  //     {role: "system", content:"Create a pub query with 10 questions and answers."},
  //     {role: "user", content: query},
  //     {role: "assistant", content: "Thanks for your query. Here are the answers to your questions:"}
  //   ]
  // })
  // return res.redirect(307, `/quizResponse?subject=${body.subject}&amount=${body.amount}`).toString();
  res.status(200).json({message: 'success'});
}

export default handler;