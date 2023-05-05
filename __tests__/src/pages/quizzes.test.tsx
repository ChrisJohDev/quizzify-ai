import {render, screen }from '@testing-library/react';
import Quizzes from '@/pages/quizzes';
import '@testing-library/jest-dom'

describe('Quizzes - snapshot test', () => {
  it('renders correctly', () => {
    const { container } = render(<Quizzes />);
    expect(container).toMatchSnapshot();
  });
});