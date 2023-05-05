import {render, screen }from '@testing-library/react';
import Contact from '@/pages/contact';
import '@testing-library/jest-dom'

describe('Contact - snapshot test', () => {
  it('renders correctly', () => {
    const { container } = render(<Contact />);
    expect(container).toMatchSnapshot();
  });
});