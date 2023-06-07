import {render, screen }from '@testing-library/react';
import Contact from '@/pages/contact';
import '@testing-library/jest-dom'

describe('ID: QAI:base-TC016 - Contact Page', () => {
  it('renders correctly', () => {
    const { container } = render(<Contact />);
    expect(container).toMatchSnapshot();
  });
});