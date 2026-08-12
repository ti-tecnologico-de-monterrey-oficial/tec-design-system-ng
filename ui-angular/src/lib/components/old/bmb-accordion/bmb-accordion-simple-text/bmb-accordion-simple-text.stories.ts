import { BmbAccordionSimpleTextComponent } from '../bmb-accordion-simple-text/bmb-accordion-simple-text.component';
import { Meta, StoryObj } from '@storybook/angular';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
} from '@docs/utils/utils';

export default {
  title: 'Components/Containers/Accordion/Simple text',
  tags: ['!autodocs'],
  component: BmbAccordionSimpleTextComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [''],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'accordion' })} to present content on vertically stacked, collapsible elements.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/accordion/descripcion-general-yABR8pUx' })}
${getSpecialSpecifications(getEmptyStateMessage(), { showAdditionalBlockquote: true })}
${getBasicExampleBlock('BmbAccordionComponent')}
        `,
      },
    },
  },
  argTypes: {},
  args: {
    titleContent: 'Lorem ipsum dolor sit amet',
    // textContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
    //    mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
    //    Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
    //    Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
    //    Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
    //    ullamcorper dictum augue diam id erat. Donec ac fringilla elit. Aliquam
    //    sit amet luctus elit.`,
    textContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
      mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
      Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
      Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
      Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
      ullamcorper dictum augue diam id erat. Donec ac fringilla elit. Aliquam
      sit amet luctus elit. Suspendisse ante tortor, euismod nec metus id,
      commodo sollicitudin massa. Aliquam magna nibh, semper eu vestibulum
      aliquam, aliquet gravida massa. Nullam vehicula, augue non aliquam
      posuere, enim urna blandit erat, et euismod enim nisi vel eros. Ut
      dictum egestas mi, faucibus iaculis lorem. Donec risus diam, maximus at
      varius rutrum, blandit quis augue. Sed consectetur massa ut auctor
      ultricies. Etiam fringilla venenatis nulla, gravida finibus nulla
      faucibus fringilla. Morbi luctus porta orci eu iaculis.`,
    disabled: false,
    expanded: true,
  },
} as Meta<typeof BmbAccordionSimpleTextComponent>;

type Story = StoryObj<BmbAccordionSimpleTextComponent>;

export const Default: Story = {};
