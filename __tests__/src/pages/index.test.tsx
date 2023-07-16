import {render, screen }from '@testing-library/react';
import Home from '@/pages/index';
import '@testing-library/jest-dom'

describe('ID: QAI:base-TC012 - Home Page', () => {
  it('renders correctly', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});