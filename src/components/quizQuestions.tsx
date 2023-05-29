import React from 'react';
import { Questions } from '@/util/types';
import QuizQuestionsItem from './quizQuestionsItem';
import styles from '@/styles/quizQuestions.module.css';
import createPdf from '@/util/pdf';

interface QuizQuestionsProps {
  subject: string,
  quiz: Questions,
  multiChoice: boolean,
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ quiz, subject, multiChoice }) => {
  // console.log('\n*** [quizQuestions.tsx]  quiz: ', quiz);

  const handleCreatePdf = () => {
    createPdf(quiz.questions, 'quiz', subject);
  }

  return (
    <div className={styles.wrapper}>
      <input type="button" onClick={handleCreatePdf} value="Create PDF" />
      <hr />
      {
        quiz.questions.map((question, index) => {
          const qNumber: number = index + 1;
          console.log('\n*** [quizQuestions - map] question:', question, '\nqNumber:', qNumber);
          return (
              <div key={index} className={styles.quizQuestion}>
                {index !== 0 && <hr />}
                <h2>Question {qNumber}</h2>
                <QuizQuestionsItem question={question} multiChoice={multiChoice} />
              </div>
          );
        })
      }
    </div>
  )
}

export default QuizQuestions; 