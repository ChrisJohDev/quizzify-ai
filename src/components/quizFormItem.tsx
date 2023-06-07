/**
 * Project Name: Quizzify-AI
 * 
 * Quiz form item component.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */

import { ReactElement } from "react";

/**
 * QuizFormItemProps interface.
 *
 * @interface QuizFormItemProps
 */
interface QuizFormItemProps {
  question: string;
}

/**
 * Quiz form item component.
 *
 * @param {QuizFormItemProps} props
 * @return {ReactElement} 
 */
const QuizFormItem = (props: QuizFormItemProps): ReactElement => {
  const { question } = props;
  return (
    <div className="question-item">
      <div className="question">{question}</div>
    </div>
  );
};

export default QuizFormItem;