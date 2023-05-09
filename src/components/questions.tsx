import QuestionItem from './questionItem';
import { QueryResponse, Props } from '@/pages/quizResponse';


const Questions = ({ queryResponse }: Props) => {

  const data = queryResponse;
  console.log('\n*** [Questions] in-data:', data);
  return (
    <div className="qAndA">
      <div className="questions">
        <h2>Questions</h2>
        {data.questions.map((result: string, index: number) => (
          <QuestionItem key={index} question={result} />
        ))}
      </div>
      <div className="answers">
        <h2>Answers</h2>
        <pre>{data.answers}</pre>
      </div>
    </div>
  );
};

export default Questions;