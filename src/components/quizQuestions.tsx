import QuestionItem from './quizQuestionsItem';
import { QueryResponse } from '@/util/types';
import styles from '@/styles/quizQuestions.module.css';

interface Props  {
  queryResponse: QueryResponse
}

const Questions = ({ queryResponse }: Props) => {

  const data = queryResponse;
  console.log('\n*** [Questions] in-data:', data);
  return (
    <div className={`qAndA ${styles.qAndA}`}>
      <div className={`${styles.questions}`}>
        <h2>Questions</h2>
        {data.questions.map((result: string, index: number) => (
          <QuestionItem key={index} question={result} />
        ))}
      </div>
      <div className={`${styles.answers}`}>
        <h2>Answers</h2>
        <pre>{data.answers}</pre>
      </div>
    </div>
  );
};

export default Questions;