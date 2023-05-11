import {render, screen }from '@testing-library/react';
import QueryResponse from '@/pages/quizResponse';
import '@testing-library/jest-dom'

describe('QueryResponse - snapshot test', () => {
  it('renders correctly', () => {
    const { container } = render(<QueryResponse queryResponse={{
      questions: [],
      answers: ''
    }} subject={''} />);
    expect(container).toMatchSnapshot();
  });
});