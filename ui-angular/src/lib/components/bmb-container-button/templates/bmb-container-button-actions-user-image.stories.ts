import { moduleMetadata } from '@storybook/angular';
import { BmbBookmarkComponent } from '../../bmb-bookmark/bmb-bookmark.component';
import { BmbBoxIconComponent } from '../../bmb-box-icon/bmb-box-icon.component';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbContainerButtonBaseComponent } from '../bmb-container-button-base/bmb-container-button-base.component';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbSimpleTextComponent } from '../../bmb-simple-text/bmb-simple-text.component';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import {
  BlockquoteType,
  getAlertBlockquote,
  getGeneralDescription,
  getSpecialSpecifications,
  getTechnicalDocReferences,
  RELEVANT_TITLE,
  TOC_OBJ,
} from '@docs/utils/utils';

import * as bmbBookmarkStory from '../../bmb-bookmark/bmb-bookmark.component.stories';
import * as bmbBoxIconStory from '../../bmb-box-icon/bmb-box-icon.stories';
import * as bmbCheckboxStory from '../../bmb-checkbox/bmb-checkbox.stories';
import * as bmbContainerButtonBaseStory from '../../bmb-container-button/bmb-container-button.stories';
import * as bmbDividerStory from '../../bmb-divider/bmb-divider.stories';
import * as bmbUserImageStory from '../../bmb-user-image/bmb-user-images.stories';

const meta = {
  title: 'Templates/Container Button/Actions User Image',
  component: BmbContainerButtonBaseComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbBookmarkComponent,
        BmbBoxIconComponent,
        BmbCheckboxComponent,
        BmbContainerButtonBaseComponent,
        BmbDividerComponent,
        BmbLayoutDirective,
        BmbSimpleTextComponent,
        BmbUserImageComponent,
        BmbVerticalLayoutDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      toc: TOC_OBJ,
      description: {
        component: `
${getGeneralDescription('The **Actions User Image** template combines a checkbox, user image, title, subtitle, bookmark, and overflow actions inside a Container Button.', { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/container-button/descripcion-general-dzTxNX36' })}
${getSpecialSpecifications(`
${getAlertBlockquote(
  'Place the bookmark, vertical divider, and overflow Box Icon together in the right slot. Keep the checkbox in the left slot and the user image with its text in the main slot, the bookmark and vertical divider can be removed in the base guideline.',
  {
    title: RELEVANT_TITLE.configuration,
    blockquoteType: BlockquoteType.important,
  },
)}
${getTechnicalDocReferences({
  references: [
    { title: bmbContainerButtonBaseStory.default.title ?? 'Components/Buttons/Container button' },
    { title: bmbBookmarkStory.default.title ?? 'Components/Buttons/Bookmark' },
    { title: bmbBoxIconStory.default.title ?? 'Components/Visual labels/Box icon' },
    { title: bmbCheckboxStory.default.title ?? 'Components/Forms/Checkbox' },
    { title: bmbDividerStory.default.title ?? 'Components/Visual labels/Divider' },
    { title: bmbUserImageStory.default.title ?? 'Components/Images/User Image' },
  ],
})}
`)}
        `,
      },
    },
  },
};
export default meta;

const template = `<bmb-container-button-base>
  <ng-template #bmbContainerLeft>
    <bmb-checkbox
      [checked]="false"
      [indeterminate]="false"
      [disabled]="false"
    />
  </ng-template>

  <ng-template #bmbContainerMain>
    <div bmbLayout margin="none" gapSize="m" justify="start" alignItems="center">
      <bmb-user-image
        size="mobile-small"
        image="https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/assets/logo.png"
      />
      <div bmbVerticalLayout gapSize="none" alignItems="start">
        <bmb-simple-text [size]="4" color="general-contrasts-100" weight="bold">Title</bmb-simple-text>
        <bmb-simple-text [size]="4" color="general-contrasts-100" weight="light">Subtitle (optional)</bmb-simple-text>
      </div>
    </div>
  </ng-template>

  <ng-template #bmbContainerRight>
    <div bmbLayout margin="none" gapSize="s" justify="end" alignItems="center" [avoidRowWrap]="true">
      <bmb-bookmark [isActive]="false" />
      <bmb-divider [type]="'simple'" [orientation]="'vertical'" [removeMargin]="true"></bmb-divider>
      <bmb-box-icon iconName="more_horiz" iconImageAlt="More actions" boxSize="small" />
    </div>
  </ng-template>
</bmb-container-button-base>`;

export const Desktop = {
  render: () => ({ template }),
  parameters: {
    docs: {
      source: { code: template, language: 'html' },
    },
  },
};

export const Mobile = {
  render: () => ({ template }),
  globals: { viewport: { value: 'small', isRotated: false } },
  parameters: {
    layout: 'fullscreen',
    docs: {
      previewWidth: '375px',
      story: { inline: false, height: '180px' },
      source: { code: template, language: 'html' },
    },
  },
};
