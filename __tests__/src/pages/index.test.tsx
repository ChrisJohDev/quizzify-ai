import {render, screen }from '@testing-library/react';
import Home from '@/pages/index';
import '@testing-library/jest-dom'

describe('Index - snapshot test', () => {
  it('renders correctly', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});