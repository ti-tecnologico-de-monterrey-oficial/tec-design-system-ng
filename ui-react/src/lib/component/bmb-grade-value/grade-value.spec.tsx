import { render } from '@testing-library/react';
import { BmbGradeValue } from './index';

describe('BmbGradeValue', () => {
  it('renders an SVG with the score for main-grade (default)', () => {
    const { container } = render(<BmbGradeValue score={10} />);
    const svg = container.querySelector('svg');

    expect(svg).not.toBeNull();
    expect(svg?.querySelector('.bmb_grade-value-main-score')?.textContent).toContain(
      '10',
    );
  });

  it('renders a partial div for partial-grade', () => {
    const { container } = render(
      <BmbGradeValue type="partial-grade" score={5} />,
    );
    const partial = container.querySelector('.bmb_grade-value-partial');

    expect(partial).not.toBeNull();
    expect(
      partial?.querySelector('.bmb_grade-value-partial-score')?.textContent,
    ).toContain('5');
  });

  it('renders string scores as-is', () => {
    const { container } = render(
      <BmbGradeValue type="partial-grade" score="Cu" />,
    );

    expect(
      container.querySelector('.bmb_grade-value-partial-score')?.textContent,
    ).toContain('Cu');
  });

  it('truncates long scores through shared logic', () => {
    const { container } = render(<BmbGradeValue score="100.50" />);

    expect(
      container.querySelector('.bmb_grade-value-main-score')?.textContent?.trim(),
    ).toBe('100.');
  });

  it('gives the SVG an accessible name derived from the score by default', () => {
    const { container } = render(<BmbGradeValue score={89} />);

    expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe(
      'Grade: 89',
    );
  });

  it('lets consumers override the SVG accessible name', () => {
    const { container } = render(
      <BmbGradeValue score={89} ariaLabel="Math grade: 89" />,
    );

    expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe(
      'Math grade: 89',
    );
  });

  it('applies the appearance class for primary and alternative contrasts', () => {
    const { container: primary } = render(
      <BmbGradeValue appearanceContrast="primary" />,
    );
    expect(primary.querySelector('.bmb_grade-value')?.className).toContain(
      'bmb_grade-value-appearance-main',
    );

    const { container: alternative } = render(
      <BmbGradeValue appearanceContrast="alternative" />,
    );
    expect(alternative.querySelector('.bmb_grade-value')?.className).toContain(
      'bmb_grade-value-appearance-alternative',
    );
  });
});
