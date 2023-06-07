import React from 'react';
import { render, screen } from '@testing-library/react';
import QuizQuestionItem from '../../../src/components/quizQuestionsItem';

const multiChoice = true;

/**
 * mockIndata1: Testing single number in the answer and choices.
 */
const mockIndata1= {
  answer: "2",
  choices: ["1", "2", "3", "4", "5"],
  question: "This is the question for mockData1?",
}

/**
 * mockIndata2: Testing string with period in the text.
 */
const mockIndata2= {
  answer: "G.I. Joe",
  choices: ["G.I. Josh", "G.I. Joey", "G.I. Joe", "G.I. Jo", "G.I. Johnny"],
  question: "This is the question for mockData2?",
}

/**
 * mockIndata3: Testing single letter in the answer and choices.
 */
const mockIndata3= {
  answer: "b",
  choices: ["a", "b", "c", "d", "e"],
  question: "This is the question for mockData1?",
}

/**
 * mockIndata4: Testing string with comma in the text.
 */
const mockIndata4 = {
  answer: "Washington, D.C.",
  choices: ["New York", "Nashville", "Washington, D.C.", "Los Angeles", "Chicago"],
  question: "What is the capital of the United States?"
}


describe('\n*** ID:QAI:base-TC017 - QuizQuestionsItem multi-choice ***', () => {
  it('testing response on mockIndata1', () => {
    render(<QuizQuestionItem question={mockIndata1} multiChoice={multiChoice} />);

    const correctAnswer = screen.getAllByText(/b\) 2/i);
    expect(correctAnswer).toHaveLength(2);

    expect(screen.getByText(/This is the question for mockData1?/i)).toBeInTheDocument();
    expect(screen.getByText(/Answer: b\) 2/i)).toBeInTheDocument();
    expect(screen.getByText(/a\) 1/)).toBeInTheDocument();
    expect(screen.getByText(/c\) 3/)).toBeInTheDocument();
    expect(screen.getByText(/d\) 4/)).toBeInTheDocument();
    expect(screen.getByText(/e\) 5/)).toBeInTheDocument();
  });

  it('testing response on mockIndata2', () => {
    render(<QuizQuestionItem question={mockIndata2} multiChoice={multiChoice} />);

    const correctAnswer = screen.getAllByText(/c\) G.I. Joe/i);
    expect(correctAnswer).toHaveLength(2);

    // console.log('\n*** [quizQuestionsItem.test] - screen.getByText(/a\) G.I. Josh/):\n', screen.getByText(/a\) G.I. Josh/))

    expect(screen.getByText(/This is the question for mockData2?/i)).toBeInTheDocument();
    expect(screen.getByText(/Answer: c\) G.I. Joe/i)).toBeInTheDocument();
    expect(screen.getByText(/a\) G.I. Josh/)).toBeInTheDocument();
    expect(screen.getByText(/b\) G.I. Joey/)).toBeInTheDocument();
    expect(screen.getByText(/d\) G.I. Jo/)).toBeInTheDocument();
    expect(screen.getByText(/e\) G.I. Johnny/)).toBeInTheDocument();
  });

  it('testing response on mockIndata3', () => {
    render(<QuizQuestionItem question={mockIndata3} multiChoice={multiChoice} />);

    const correctAnswer = screen.getAllByText(/b\) b/i);
    expect(correctAnswer).toHaveLength(2);

    expect(screen.getByText(/This is the question for mockData3?/i)).toBeInTheDocument();
    expect(screen.getByText(/Answer: b\) b/i)).toBeInTheDocument();
    expect(screen.getByText(/a\) a/)).toBeInTheDocument();
    expect(screen.getByText(/c\) c/)).toBeInTheDocument();
    expect(screen.getByText(/d\) d/)).toBeInTheDocument();
    expect(screen.getByText(/e\) e/)).toBeInTheDocument();
  });

  it('testing response on mockIndata4', () => {
    render(<QuizQuestionItem question={mockIndata4} multiChoice={multiChoice} />);

    const correctAnswer = screen.getAllByText(/c\) Washington, D.C./i);
    expect(correctAnswer).toHaveLength(2);

    expect(screen.getByText(/What is the capital of the United States?/i)).toBeInTheDocument();
    expect(screen.getByText(/Answer: c\) Washington, D.C./i)).toBeInTheDocument();
    expect(screen.getByText(/a\) New York/)).toBeInTheDocument();
    expect(screen.getByText(/b\) Nashville/)).toBeInTheDocument();
    expect(screen.getByText(/d\) Los Angeles/)).toBeInTheDocument();
    expect(screen.getByText(/e\) Chicago/)).toBeInTheDocument();
  });
});

describe('\n*** ID:QAI:base-TC018 - QuizQuestionsItem single-choice ***', () => {
  it('testing response on mockIndata1', () => {
    render(<QuizQuestionItem question={mockIndata1} multiChoice={!multiChoice} />);

    expect(screen.getByText(/This is the question for mockData1?/i)).toBeInTheDocument();
    expect(screen.getByText(/Answer: 2/i)).toBeInTheDocument();
  });

  it('testing response on mockIndata2', () => {
    render(<QuizQuestionItem question={mockIndata2} multiChoice={!multiChoice} />);

    expect(screen.getByText(/This is the question for mockData2?/i)).toBeInTheDocument();
    expect(screen.getByText(/Answer: G.I. Joe/i)).toBeInTheDocument();
  });

  it('testing response on mockIndata3', () => {
    render(<QuizQuestionItem question={mockIndata3} multiChoice={!multiChoice} />);

    expect(screen.getByText(/This is the question for mockData3?/i)).toBeInTheDocument();
    expect(screen.getByText(/Answer: b/i)).toBeInTheDocument();
  });

  it('testing response on mockIndata4', () => {
    render(<QuizQuestionItem question={mockIndata4} multiChoice={!multiChoice} />);

    expect(screen.getByText(/What is the capital of the United States?/i)).toBeInTheDocument();
    expect(screen.getByText(/Answer: Washington, D.C./i)).toBeInTheDocument();
  });
});
