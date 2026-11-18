import { render } from '@testing-library/react';
import { BmbSkeleton } from './index';
import type { BmbSkeletonType } from '../../_shared/types/components/skeleton';

describe('BmbSkeleton', () => {
  it.each<[BmbSkeletonType, string]>([
    ['header', '.bmb_skeleton-header'],
    ['input', '.bmb_skeleton-input'],
    ['stray', '.bmb_skeleton-stray'],
    ['generic1', '.bmb_skeleton-generic1'],
    ['generic2', '.bmb_skeleton-generic2'],
    ['generic3', '.bmb_skeleton-generic3'],
  ])('renders the %s skeleton', (type, selector) => {
    const { container } = render(<BmbSkeleton type={type} />);

    expect(container.querySelector(selector)).not.toBeNull();
  });

  it('defaults to the header skeleton', () => {
    const { container } = render(<BmbSkeleton />);

    expect(container.querySelector('.bmb_skeleton-header')).not.toBeNull();
  });

  it('renders the correct number of placeholder items per variant', () => {
    const { container: stray } = render(<BmbSkeleton type="stray" />);
    expect(stray.querySelectorAll('.bmb_skeleton-item')).toHaveLength(3);
    expect(stray.querySelectorAll('.bmb_skeleton-circle')).toHaveLength(1);

    const { container: generic1 } = render(<BmbSkeleton type="generic1" />);
    expect(generic1.querySelectorAll('.bmb_skeleton-item')).toHaveLength(4);
  });
});
