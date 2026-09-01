import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

// jsdom doesn't expose `spellcheck` as a known HTMLElement property, which
// fails Angular's strict property checks when rendering ui-angular inputs.
if (
  typeof window !== 'undefined' &&
  window.HTMLElement &&
  !('spellcheck' in window.HTMLElement.prototype)
) {
  Object.defineProperty(window.HTMLElement.prototype, 'spellcheck', {
    configurable: true,
    get(this: HTMLElement) {
      return this.hasAttribute('spellcheck');
    },
    set(this: HTMLElement, value: boolean) {
      if (value) {
        this.setAttribute('spellcheck', 'true');
      } else {
        this.removeAttribute('spellcheck');
      }
    },
  });
}

setupZonelessTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
