/**
 * Project Name: Quizzify-AI
 *
 * Quizzes page. Main page for creating quizzes.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import React, { useState, useEffect } from 'react';
import styles from '@/styles/quizzes.module.css';
import QuizForm from '@/components/quizForm';
import { Questions } from '@/util/types';
import QuizQuestions from '@/components/quizQuestions';

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Quizzes page. Main page for creating quizzes.
 *
 * @returns {React.ReactElement} - The quizzes page.
 */
const Quizzes: React.FC = (): React.ReactElement => {
  const [quiz, setQuiz] = useState<Questions>({ questions: [], subject: '' });
  const [subject, setSubject] = useState<string>('');
  const [multiChoice, setMultiChoice] = useState<boolean>(false);

  useEffect(() => {
    isDevelopment && console.log('\n*** [quizzes] quiz:', quiz, '\nmultiChoice:', multiChoice);
  }, [multiChoice, quiz]);

  return (
    <div className={`container mx-auto flex flex-col flex-fill items-center ${styles.quizPage}`}>
      {
        quiz.questions.length < 1
          ? <>
            <h1 className="text-center">Create your quiz</h1>
            <div className="col-md-6 offset-md-3 flex flex-col info">
              <QuizForm
                setQuiz={setQuiz}
                setSubject={setSubject} subject={subject}
                setMultiChoice={setMultiChoice}
              />
            </div>
          </>
          : <>
            <h1 className="text-center">Your quiz on the subject of {subject}</h1>
            <QuizQuestions quiz={quiz} subject={subject} multiChoice={multiChoice} />
          </>
      }
    </div>
  );
};

export default Quizzes;
