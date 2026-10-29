import { FormControl, Validators } from '@angular/forms';

const NAVIGATION_KEYS = ['Tab', 'Shift', 'ArrowLeft', 'ArrowRight', 'Backspace'];

export function getTotpCodeIndexes(maxCode: number): number[] {
  return Array.from({ length: maxCode }, (_, i) => i);
}

export function isTotpNavigationKey(key: string): boolean {
  return NAVIGATION_KEYS.includes(key);
}

export function parseTotpInputIndex(inputId: string): number {
  const match = inputId.match(/_(\d+)$/);
  return match ? parseInt(match[1], 10) : -1;
}

export function joinTotpCode(formValue: Record<string, unknown>): string {
  return Object.values(formValue).join('');
}

export function buildTotpControlsMap(
  instanceId: string,
  maxCode: number,
): Record<string, FormControl> {
  const group: Record<string, FormControl> = {};
  for (let i = 0; i < maxCode; i++) {
    group[`name_${instanceId}_${i}`] = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9a-zA-Z]'),
    ]);
  }
  return group;
}
