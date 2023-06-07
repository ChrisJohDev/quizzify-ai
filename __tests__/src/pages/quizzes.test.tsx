import {render, screen }from '@testing-library/react';
import Quizzes from '@/pages/quizzes';
import '@testing-library/jest-dom'

describe('ID: QAI:base-TC014 - Quizzes Page', () => {
  it('renders correctly', () => {
    const { container } = render(<Quizzes />);
    expect(container).toMatchSnapshot();
  });
});