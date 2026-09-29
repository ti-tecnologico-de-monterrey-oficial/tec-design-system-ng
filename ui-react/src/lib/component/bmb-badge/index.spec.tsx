import { render, screen } from '@testing-library/react';
import { BmbBadge } from './index';

describe('BmbBadge', () => {
  it('renders the text with the default normal container classes', () => {
    render(<BmbBadge text="New" container />);

    const badge = screen.getByText('New').closest('section');
    const bullet = badge?.querySelector('span');

    expect(badge).not.toBeNull();
    expect(badge?.className).toContain('bmb_badge');
    expect(badge?.className).toContain('bmb_badge-container');
    expect(badge?.className).toContain('bmb_badge-normal');
    expect(badge?.querySelector('.bmb_badge-content')?.textContent?.trim()).toBe(
      'New',
    );
    expect(bullet?.className).toBe('bmb_badge-normal');
  });

  it('applies the selected appearance to the container and bullet', () => {
    render(<BmbBadge appearance="success-primary" text="Success" container />);

    const badge = screen.getByText('Success').closest('section');
    const bullet = badge?.querySelector('span');

    expect(badge?.className).toContain('bmb_badge');
    expect(badge?.className).toContain('bmb_badge-container');
    expect(badge?.className).toContain('bmb_badge-success-primary');
    expect(bullet?.className).toBe('bmb_badge-success-primary');
  });

  it('only applies the disabled appearance class when the container is disabled', () => {
    render(<BmbBadge appearance="disabled" text="Disabled" container />);

    const badge = screen.getByText('Disabled').closest('section');
    const bullet = badge?.querySelector('span');

    expect(badge?.className).toContain('bmb_badge');
    expect(badge?.className).toContain('bmb_badge-container');
    expect(badge?.className).toContain('bmb_badge-disabled');
    expect(bullet?.className).toBe('');
  });

  it('omits the container and appearance classes for a non-disabled badge without a container', () => {
    render(<BmbBadge appearance="success-primary" text="Inline" container={false} />);

    const badge = screen.getByText('Inline').closest('section');
    const bullet = badge?.querySelector('span');

    expect(badge?.className).toContain('bmb_badge');
    expect(badge?.className).not.toContain('bmb_badge-container');
    expect(badge?.className).not.toContain('bmb_badge-success-primary');
    expect(bullet?.className).toBe('bmb_badge-success-primary');
  });

  it('keeps the disabled class without a container', () => {
    render(<BmbBadge appearance="disabled" text="Disabled" container={false} />);

    const badge = screen.getByText('Disabled').closest('section');

    expect(badge?.className).toContain('bmb_badge');
    expect(badge?.className).toContain('bmb_badge-disabled');
    expect(badge?.className).not.toContain('bmb_badge-container');
  });
});
