import {render, screen }from '@testing-library/react';
import QueryResponse from '@/pages/queryResponse';
import '@testing-library/jest-dom'

describe('QueryResponse - snapshot test', () => {
  it('renders correctly', () => {
    const { container } = render(<QueryResponse />);
    expect(container).toMatchSnapshot();
  });
});