import React from "react";
import { Question } from "@/util/types";


interface QuizQuestionsItemProps {
  question: Question;
}

const QuizQuestionsItem: React.FC<QuizQuestionsItemProps> = ({question}) => {
  return (
    <div className="quiz-questions-item">
      <h3>{question.question}</h3>
      <p>Answer: {question.answer}</p>
    </div>
  )
}

export default QuizQuestionsItem;