import { render } from '@testing-library/react';
import { BmbNotificationCounter } from './index';

describe('BmbNotificationCounter', () => {
  it('renders nothing when the counter is 0 or omitted', () => {
    const { container } = render(<BmbNotificationCounter />);
    expect(container.querySelector('.bmb_notification-counter')).toBeNull();
  });

  it('caps notification counters at 99+', () => {
    const { container } = render(<BmbNotificationCounter counter={125} />);
    const counter = container.querySelector('.bmb_notification-counter-number');

    expect(counter?.textContent).toContain('99+');
    expect(counter?.className).toContain('bmb_notification-counter-bullet');
  });

  it('renders the plain appearance', () => {
    const { container } = render(
      <BmbNotificationCounter counter={7} appearance="plain" />,
    );
    const counter = container.querySelector('.bmb_notification-counter-number');

    expect(counter?.textContent).toContain('(7)');
    expect(counter?.className).toContain('bmb_notification-counter-plain');
  });

  it('renders projected children alongside the counter', () => {
    const { container } = render(
      <BmbNotificationCounter counter={3}>
        <span data-testid="icon">icon</span>
      </BmbNotificationCounter>,
    );

    expect(container.querySelector('[data-testid="icon"]')).not.toBeNull();
  });
});
