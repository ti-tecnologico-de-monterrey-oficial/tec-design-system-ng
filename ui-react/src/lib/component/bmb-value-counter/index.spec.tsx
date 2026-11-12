import { render } from '@testing-library/react';
import { BmbValueCounter } from './index';

describe('BmbValueCounter', () => {
  it('renders the default formatted values', () => {
    const { container } = render(
      <BmbValueCounter
        label="Test Label"
        value="Test Value"
        progress="Test Progress"
      />,
    );

    expect(
      container.querySelector('.bmb_value-counter-label')?.textContent,
    ).toContain('Test Label');
    expect(
      container.querySelector('.bmb_value-counter-progress')?.textContent,
    ).toContain('Test Progress');
    expect(
      container.querySelector('.bmb_value-counter-value')?.textContent,
    ).toContain('Test Value');
    expect(
      container.querySelector('.bmb_value-counter-slash')?.textContent,
    ).toContain('/');
  });

  it('supports a custom formatter and separator', () => {
    const { container } = render(
      <BmbValueCounter
        progress="25"
        value="100"
        textFormatSeparator=":"
        textFormat={(progress, total) => `${progress}:${total}`}
      />,
    );

    expect(
      container.querySelector('.bmb_value-counter-progress')?.textContent,
    ).toBe('25');
    expect(
      container.querySelector('.bmb_value-counter-value')?.textContent,
    ).toBe('100');
    expect(
      container.querySelector('.bmb_value-counter-slash')?.textContent,
    ).toBe(':');
  });

  it('shows the complete formatted value when the separator is absent', () => {
    const { container } = render(
      <BmbValueCounter textFormat={() => 'Sin separador'} />,
    );

    expect(
      container.querySelector('.bmb_value-counter-progress'),
    ).toBeNull();
    expect(
      container.querySelector('.bmb_value-counter-value')?.textContent,
    ).toBe('Sin separador');
  });
});
