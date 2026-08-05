export interface ExampleBadgeProps {
  text?: string;
  appearance?: 'normal' | 'success' | 'warning' | 'error';
}

export function ExampleBadge({
  text = 'Badge text',
  appearance = 'normal',
}: ExampleBadgeProps) {
  return <span className={`example-badge example-badge--${appearance}`}>{text}</span>;
}

export default ExampleBadge;
