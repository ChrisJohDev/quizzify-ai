import {render, screen }from '@testing-library/react';
import About from '@/pages/about';
import '@testing-library/jest-dom'

describe('About - snapshot test', () => {
  it('renders correctly', () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});