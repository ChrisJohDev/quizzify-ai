import React from 'react';
import { Questions } from '@/util/types';
import QuizQuestionsItem from './quizQuestionsItem';
import styles from '@/styles/quizQuestions.module.css';
import createPdf from '@/util/pdf';

interface QuizQuestionsProps {
  subject: string,
  quiz: Questions
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ quiz, subject }) => {
  // console.log('\n*** [quizQuestions.tsx]  quiz: ', quiz);

  const handleCreatePdf = () => {
    createPdf(quiz.questions, 'quiz', subject);
  }

  return (
    <div className={styles.wrapper}>
      <input type="button" onClick={handleCreatePdf} value="Create PDF" />
      {
        quiz.questions.map((question, index) => {
          const qNumber: number = index + 1;
          return (
              <div key={index} className={styles.quizQuestion}>
                {index !== 0 && <hr />}
                <h2>Question {qNumber}</h2>
                <QuizQuestionsItem question={question} />
              </div>
          );
        })
      }
    </div>
  )
}

export default QuizQuestions; 