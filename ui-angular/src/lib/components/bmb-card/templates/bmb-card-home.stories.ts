import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BmbCardComponent,
  BmbCardContentComponent,
  BmbCardHeaderComponent,
} from '../bmb-card.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { staticCardStory } from './bmb-card-template-story.utils';

const meta: Meta<BmbCardComponent> = {
  title: 'Components/Containers/Generic card/Home',
  component: BmbCardComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbCardComponent,
        BmbCardContentComponent,
        BmbCardHeaderComponent,
        BmbIconComponent,
        BmbTitleComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
        BmbVerticalLayoutDirective,
        BmbVerticalLayoutItemDirective,
      ],
    }),
  ],
};
export default meta;

const file =
  () => `<div bmbVerticalLayoutItem><bmb-card type="normal" borderRadius="m" margin="none"><bmb-card-content padding="l">
  <div bmbLayout margin="none" gapSize="m" alignItems="center" [avoidRowWrap]="true">
    <bmb-icon bmbLayoutItem icon="image" [size]="24" alt="Archivo de imagen" />
    <bmb-title bmbLayoutItem [isDynamicItem]="true" [colGrow]="1" componentTitle="Nombre_Archivo.png" titleSize="5" titleFontWeight="500" subtitle="Descripción del documento agregado" subtitleSize="4" subtitleFontWeight="400" />
    <bmb-icon bmbLayoutItem icon="file_open" [size]="24" alt="Abrir archivo" />
  </div>
</bmb-card-content></bmb-card></div>`;

const template =
  () => `<div bmbLayout margin="none" gapSize="m" alignItems="stretch"><div bmbLayoutItem [colSm]="4" [colLg]="4" [colXl]="4">
  <bmb-card type="normal" borderRadius="l" margin="none" boxShadowStyle="box-shadow-3">
    <bmb-card-header padding="l">Title</bmb-card-header><bmb-card-content padding="l">
      <div bmbVerticalLayout margin="none" gapSize="l" alignItems="stretch" layoutHeight="34rem">
        <div bmbVerticalLayoutItem><div bmbLayout margin="none" gapSize="m" justify="spaceBetween" alignItems="center" [avoidRowWrap]="true"><span bmbLayoutItem>Lorem ipsum</span><span bmbLayoutItem>0 / 00</span></div></div>
        <div bmbVerticalLayoutItem [rowGrow]="1"><div bmbVerticalLayout margin="none" gapSize="l" alignItems="stretch">${[1, 2, 3, 4, 5].map(() => file()).join('')}</div></div>
      </div>
    </bmb-card-content>
  </bmb-card>
</div></div>`;

export const Desktop = staticCardStory(template());
export const Mobile = staticCardStory(template(), true);
