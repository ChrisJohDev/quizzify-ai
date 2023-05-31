import React from "react";
import { MultiChoiceQuestion, Question } from "@/util/types";
import { MultiChoice } from "@/util/types";

const isDevelopment = process.env.NODE_ENV === 'development';

interface QuizQuestionsItemProps {
  question: Question | MultiChoiceQuestion;
  multiChoice: boolean;
}

// const getKeyFromEnumLetter = (letter: keyof typeof MultiChoice) => {
//   return MultiChoice[letter];
// }

const multiItem = (question: MultiChoiceQuestion) => {
  const answer =  question.answer;
  let answerIndex = 0;
  // question.answer.length === 1
  // ? question.choices[getKeyFromEnumLetter(question.answer.toLowerCase() as keyof typeof MultiChoice)]
  // : question.answer;
  console.log('\n*** [QuizQuestionsItem - multiItem] answer:', answer);


  return (
    <div>
      <ul>
        {
        question.choices.map((choice, index) => {
          if(answer === choice){
            answerIndex = index;
          }
          return(
            <li key={index}>{MultiChoice[index]}) {choice}</li>
          )
        })
      }
      </ul>
      <p>Answer: {MultiChoice[answerIndex]}) {answer}</p>
    </div>
  )
}

const QuizQuestionsItem: React.FC<QuizQuestionsItemProps> = ({ question, multiChoice }) => {
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