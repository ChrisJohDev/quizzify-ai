import {render, screen }from '@testing-library/react';
import Pricing from '@/pages/pricing';
import '@testing-library/jest-dom'

describe('ID: QAI:base-TC015 - Pricing Page', () => {
  it('renders correctly', () => {
    const { container } = render(<Pricing />);
    expect(container).toMatchSnapshot();
  });
});