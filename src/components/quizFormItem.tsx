

const QuizFormItem = (props: any) => {
  const { question } = props;
  return (
    <div className="question-item">
      <div className="question">{question}</div>
    </div>
  );
};

export default QuizFormItem;