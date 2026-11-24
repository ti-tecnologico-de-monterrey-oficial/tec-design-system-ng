import { render } from '@testing-library/react';
import { BmbLegend } from './index';

describe('BmbLegend', () => {
  it('renders with default values', () => {
    const { container } = render(<BmbLegend />);

    expect(container.querySelector('.bmb_legend-label')?.textContent).toBe('');
    expect(container.querySelector('.bmb_legend-value')?.textContent).toBe('');
    expect(
      container.querySelector('.bmb_legend-indicator span')?.className,
    ).toContain('bmb_legend-bullet-normal');
  });

  it('renders the label and value', () => {
    const { container } = render(<BmbLegend label="Title" value="$0.00" />);

    expect(container.querySelector('.bmb_legend-label')?.textContent).toBe(
      'Title',
    );
    expect(container.querySelector('.bmb_legend-value')?.textContent).toBe(
      '$0.00',
    );
  });

  it('applies the bullet and value classes for the selected appearance', () => {
    const { container } = render(
      <BmbLegend label="Title" value="$0.00" indicatorAppearance="success" />,
    );

    expect(
      container.querySelector('.bmb_legend-indicator span')?.className,
    ).toContain('bmb_legend-bullet-success');
    expect(container.querySelector('.bmb_legend-value')?.className).toContain(
      'bmb_legend-value-success',
    );
  });

  it('applies the error appearance', () => {
    const { container } = render(
      <BmbLegend indicatorAppearance="error" value="-$10.00" />,
    );

    expect(
      container.querySelector('.bmb_legend-indicator span')?.className,
    ).toContain('bmb_legend-bullet-error');
    expect(container.querySelector('.bmb_legend-value')?.className).toContain(
      'bmb_legend-value-error',
    );
  });
});
