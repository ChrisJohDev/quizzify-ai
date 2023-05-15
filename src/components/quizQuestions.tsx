import React, { useState } from 'react';
import { Question } from '@/util/types';
import QuizQuestionsItem from './quizQuestionsItem';
import styles from '@/styles/quizQuestions.module.css';

interface QuizQuestionsProps {
  quiz: Question[];
}

const QuizQuestions: React.FC<QuizQuestionsProps> = ({ quiz }) => {
  console.log('\n*** [quizQuestions.tsx]  quiz: ', quiz);

  return (
    <div className={styles.wrapper}>
      {
        quiz.map((question, index) => {
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