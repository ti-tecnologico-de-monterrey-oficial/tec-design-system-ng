import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BmbPortalComponent,
  BmbThemeComponent,
  BmbTopBarComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
} from '../../projects/ds-ng/src/public-api';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  imports: [
    RouterModule,
    BmbThemeComponent,
    BmbPortalComponent,
    BmbTopBarComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppComponent {}
