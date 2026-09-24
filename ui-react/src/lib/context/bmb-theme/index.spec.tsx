import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './index';

function ThemeConsumer() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme;
  });

  it('uses light as the default theme', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('uses the provided default theme', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('changes the theme and updates the document attribute', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    screen.getByRole('button', { name: 'Dark' }).click();

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');

    screen.getByRole('button', { name: 'Light' }).click();

    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('throws when useTheme is used outside the provider', () => {
    function InvalidConsumer() {
      useTheme();
      return null;
    }

    expect(() => render(<InvalidConsumer />)).toThrow(
      'useTheme must be used inside ThemeProvider',
    );
  });
});
