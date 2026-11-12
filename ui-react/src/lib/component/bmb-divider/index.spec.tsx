import { render } from '@testing-library/react';
import { BmbDivider } from './index';

describe('BmbDivider', () => {
  it('renders horizontal defaults without vertical or no-margin styling', () => {
    const { container } = render(<BmbDivider />);
    const divider = container.querySelector('div');

    expect(divider?.className).toContain('bmb_divider');
    expect(divider?.className).toContain('bmb_divider-simple');
    expect(divider?.className).toContain('bmb_divider-horizontal');
    expect(divider?.className).not.toContain('bmb_divider-vertical');
    expect(divider?.className).not.toContain('bmb_divider-no-margin');
  });

  it('renders the vertical orientation class', () => {
    const { container } = render(<BmbDivider orientation="vertical" />);
    const divider = container.querySelector('div');

    expect(divider?.className).toContain('bmb_divider-vertical');
  });

  it('renders classes for its type and margin props', () => {
    const { container } = render(
      <BmbDivider type="dotted" removeMargin />,
    );
    const divider = container.querySelector('div');

    expect(divider?.className).toContain('bmb_divider-dotted');
    expect(divider?.className).toContain('bmb_divider-horizontal');
    expect(divider?.className).toContain('bmb_divider-no-margin');
  });

  it('renders all requested classes for a vertical dashed divider without margin', () => {
    const { container } = render(
      <BmbDivider type="dashed" orientation="vertical" removeMargin />,
    );
    const divider = container.querySelector('div');

    expect(divider?.className).toContain('bmb_divider-dashed');
    expect(divider?.className).toContain('bmb_divider-vertical');
    expect(divider?.className).toContain('bmb_divider-no-margin');
  });
});
