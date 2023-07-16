/**
 * Project Name: Quizzify-AI
 * 
 * Quiz form items component.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import QuizFormItem from './quizFormItem';
import { QueryResponse } from '@/util/types';
import styles from '@/styles/quizFormItems.module.css';
import { ReactElement } from 'react';

/**
 * Props interface.
 *
 * @interface Props
 */
interface Props  {
  queryResponse: QueryResponse
}

/**
 * Quiz form items component.
 *
 * @param {Props} { queryResponse }
 * @return {ReactElement} 
 */
const Questions = ({ queryResponse }: Props): ReactElement => {

  const data = queryResponse;
  // console.log('\n*** [Questions] in-data:', data);
  return (
    <div className={`qAndA ${styles.qAndA}`}>
      <div className={`${styles.questions}`}>
        <h2>Questions</h2>
        {data.questions.map((result: string, index: number) => (
          <QuizFormItem key={index} question={result} />
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