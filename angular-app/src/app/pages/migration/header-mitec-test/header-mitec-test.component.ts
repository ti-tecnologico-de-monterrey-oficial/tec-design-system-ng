import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbHeaderMitecComponent,
  BmbButtonDirective,
  BmbLayoutDirective,
} from 'ui-angular';
import type { IBmbActionHeaderLinks } from 'ui-angular';

@Component({
  selector: 'app-header-mitec-test-component',
  imports: [BmbHeaderMitecComponent, BmbButtonDirective, BmbLayoutDirective],
  templateUrl: './header-mitec-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMitecTestComponent {
  readonly headerLabel = signal('ESTUDIANTES');
  readonly actionHeaderLinks = signal<IBmbActionHeaderLinks | undefined>(
    undefined,
  );
  readonly linksVersion = signal(0);

  updateLinks(): void {
    const version = this.linksVersion() + 1;
    this.linksVersion.set(version);
    this.actionHeaderLinks.set({
      apple: {
        link: 'https://example.com/apple?v=' + version,
        target: '_blank',
      },
      android: {
        link: 'https://example.com/android?v=' + version,
        target: '_blank',
      },
      twitter: {
        link: 'https://example.com/twitter?v=' + version,
        target: '_blank',
      },
      facebook: {
        link: 'https://example.com/facebook?v=' + version,
        target: '_blank',
      },
      instagram: {
        link: 'https://example.com/instagram?v=' + version,
        target: '_blank',
      },
      youtube: {
        link: 'https://example.com/youtube?v=' + version,
        target: '_blank',
      },
    });
  }
}
