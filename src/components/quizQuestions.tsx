/**
 * Project Name: Quizzify-AI
 *
 * Quiz questions component.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import React, { ReactElement } from 'react';
import { Questions } from '@/util/types';
import QuizQuestionsItem from './quizQuestionsItem';
import styles from '@/styles/quizQuestions.module.css';
import createPdf from '@/util/pdf';
import createMultiChoicePdf from '@/util/multiChoicePdf';

/**
 * QuizQuestionsProps interface.
 *
 * @interface QuizQuestionsProps
 */
interface QuizQuestionsProps {
  subject: string,
  quiz: Questions,
  multiChoice: boolean,
}

/**
 * Quiz questions component.
 *
 * @param {QuizQuestionsProps} props - The props for the component.
 * @param {Questions} props.quiz - The quiz questions.
 * @param {string} props.subject - The subject of the quiz.
 * @param {boolean} props.multiChoice - Whether or not the quiz is multiple choice.
 * @returns {ReactElement} - The quiz questions component.
 */
const QuizQuestions: React.FC<QuizQuestionsProps> = ({ quiz, subject, multiChoice }: QuizQuestionsProps): ReactElement => {
  /**
   * Handles the create PDF event.
   *
   * @param {Event} ev - The event.
   * @param {Function} ev.preventDefault - Prevents the default event.
   * @returns {void} - Nothing.
   */
  const handleCreatePdf = (ev: { preventDefault: () => void; }) => {
    ev.preventDefault();
    console.log('\n*** [quizQuestions] - quiz.questions: ', quiz.questions);
    // alert('quizQuestions - \nquiz: ' + JSON.stringify(quiz.questions) + '\nsubject: ' + subject);
    multiChoice ? createMultiChoicePdf(quiz.questions, 'quiz', subject) : createPdf(quiz.questions, 'quiz', subject);
  };

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
  );
};

export default QuizQuestions;
