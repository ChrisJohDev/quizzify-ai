import {render, screen }from '@testing-library/react';
import About from '@/pages/about';
import '@testing-library/jest-dom'

describe('ID: QAI:base-TC013 - About Page', () => {
  it('renders correctly', () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});