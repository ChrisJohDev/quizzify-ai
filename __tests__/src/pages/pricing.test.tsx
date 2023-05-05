import {render, screen }from '@testing-library/react';
import Pricing from '@/pages/pricing';
import '@testing-library/jest-dom'

describe('Pricing - snapshot test', () => {
  it('renders correctly', () => {
    const { container } = render(<Pricing />);
    expect(container).toMatchSnapshot();
  });
});