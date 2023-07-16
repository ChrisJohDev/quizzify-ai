/**
 * Project Name: Quizzify-AI
 * 
 * Quiz questions item component.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import React, { ReactElement } from "react";
import { MultiChoiceQuestion, Question } from "@/util/types";
import { MultiChoice } from "@/util/types";

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * QuizQuestionsItemProps interface.
 *
 * @interface QuizQuestionsItemProps
 */
interface QuizQuestionsItemProps {
  question: Question | MultiChoiceQuestion;
  multiChoice: boolean;
}

/**
 * MultiChoiceQuestion multi-item component.
 *
 * @param {MultiChoiceQuestion} question
 * @return {ReactElement} 
 */
const multiItem = (question: MultiChoiceQuestion): ReactElement => {
  const answer = question.answer;
  let answerIndex = 0;

  return (
    <div>
      <ul>
        {
          question.choices.map((choice, index) => {
            if (answer === choice) {
              answerIndex = index;
            }
            return (
              <li key={index}>{MultiChoice[index]}) {choice}</li>
            )
          })
        }
      </ul>
      <p>Answer: {MultiChoice[answerIndex]}) {answer}</p>
    </div>
  )
}

/**
 * Quiz questions item component.
 *
 * @param {QuizQuestionsItemProps} { question, multiChoice }
 * @return {ReactElement} 
 */
const QuizQuestionsItem: React.FC<QuizQuestionsItemProps> = ({ question, multiChoice }: QuizQuestionsItemProps): ReactElement => {
  isDevelopment && console.log('\n*** [QuizQuestionsItem] question:', question, '\nmultiChoice:', multiChoice);
  return (
    <div className="quiz-questions-item">
      <h3>{question.question}</h3>
      {
        multiChoice
          ? <>
            {multiItem(question as MultiChoiceQuestion)}
          </>
          : <>
            <p>Answer: {question.answer}</p>
          </>
      }
    </div>
  );
}

export default QuizQuestionsItem;