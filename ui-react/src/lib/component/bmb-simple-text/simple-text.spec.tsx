import { render, screen } from '@testing-library/react';
import { BmbSimpleText } from './index';

describe('BmbSimpleText', () => {
  it('renders a <p> tag by default with the provided text', () => {
    render(<BmbSimpleText>Hello world</BmbSimpleText>);

    const text = screen.getByText('Hello world');

    expect(text.tagName).toBe('P');
    expect(text.className).toBe('bmb_simple-text');
  });

  it('renders the tag set by elementType', () => {
    render(<BmbSimpleText elementType="span">Inline text</BmbSimpleText>);

    const text = screen.getByText('Inline text');

    expect(text.tagName).toBe('SPAN');
  });

  it('applies size, weight and color as inline styles', () => {
    render(
      <BmbSimpleText size={9} weight="bold" color="general-contrasts-100">
        Styled text
      </BmbSimpleText>,
    );

    const text = screen.getByText('Styled text');

    expect(text.style.fontSize).toBe('1.5rem');
    expect(text.style.fontWeight).toBe('700');
    expect(text.style.color).toBe('var(--general-contrasts-100)');
  });
});
