interface QuizFormItemProps {
  question: string;
}

const QuizFormItem = (props: QuizFormItemProps) => {
  const { question } = props;
  return (
    <div className="question-item">
      <div className="question">{question}</div>
    </div>
  );
};

export default QuizFormItem;