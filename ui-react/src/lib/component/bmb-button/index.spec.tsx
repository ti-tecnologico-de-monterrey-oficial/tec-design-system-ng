import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BmbButton } from './index';

describe('BmbButton', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    Reflect.deleteProperty(globalThis, 'fetch');
  });

  it('applies appearance, toggle, case, and mobile classes', () => {
    render(
      <BmbButton
        appearance="secondary-outlined"
        case
        enableButtonToggle
        isToggleActive
        isMobile
      >
        Save
      </BmbButton>,
    );

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.className).toContain('bmb_btn-secondary-outlined');
    expect(button.className).toContain('bmb_btn-case');
    expect(button.className).toContain('bmb_btn-toggle-active');
    expect(button.className).toContain('bmb_btn-mobile');
    expect(button.getAttribute('case')).toBe('true');
  });

  it('renders a named icon before or after its children', async () => {
    Object.defineProperty(globalThis, 'fetch', {
      configurable: true,
      value: jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '<svg><path d="M0 0h1v1H0z" /></svg>',
      } as Response),
    });

    const { rerender } = render(<BmbButton icon="home">Home</BmbButton>);

    let button = screen.getByRole('button', { name: 'Home' });
    await waitFor(() => expect(button.querySelector('svg')).not.toBeNull());
    expect(button.firstElementChild?.className).toContain('bmb_icon-svg');
    expect(button.getAttribute('size')).toBe('small');

    rerender(
      <BmbButton icon="home" position="right">
        Home
      </BmbButton>,
    );

    button = screen.getByRole('button', { name: 'Home' });
  expect(button.lastElementChild?.className).toContain('bmb_icon-svg');
    expect(button.getAttribute('position')).toBe('right');
  });

  it('renders image icons with alt text and forwards native button props', () => {
    const onClick = jest.fn();
    render(
      <BmbButton
        icon="/assets/save.svg"
        iconAlt="Save icon"
        iconSize={24}
        size="large"
        aria-label="Save changes"
        onClick={onClick}
      >
        Save
      </BmbButton>,
    );

    const button = screen.getByRole('button', { name: 'Save changes' });
    expect(button.getAttribute('size')).toBe('large');
    expect(screen.getByAltText('Save icon').getAttribute('src')).toBe('/assets/save.svg');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('omits the rounded class when isRounded is false', () => {
    render(<BmbButton isRounded={false}>Plain</BmbButton>);

    expect(screen.getByRole('button').className).not.toContain('bmb_btn-rounded');
  });
});
