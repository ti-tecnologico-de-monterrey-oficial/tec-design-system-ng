import type { Meta, StoryObj } from '@storybook/angular';
import { BmbImageComponent } from './bmb-image.component';
import {
  DESIGN_SYSTEM_TITLE,
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { DBmbImageParamDesc } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Images/Image',
  component: BmbImageComponent,
  parameters: {
    docs: {
      controls: { exclude: ['getClasses'] },
      description: {
        component: `
${getGeneralDescription({
  content: `\`bmb-media-card\` is a ${DESIGN_SYSTEM_TITLE} component that displays an image with configurable properties.`,
  generalDocLink:
    'https://bamboo.tec.mx/latest/componentes/image/descripcion-general-1o8OTusS',
})}
${getArchitectureSection(`<section class="bmb_image"> <!-- Conditional classes and tyles based on radius and width inputs ->
  <figure class="bmb_image-figure">
    <picture>
      <source />
      <img class="bmb_image-figure-image" />
    </picture>
  </figure>
</section>`)}
${getBasicExampleBlock('BmbImageComponent')}
        `,
      },
    },
  },
  argTypes: {
    src: DBmbImageParamDesc.src,
    mobileSrc: DBmbImageParamDesc.mobileSrc,
    alt: DBmbImageParamDesc.alt,
    width: DBmbImageParamDesc.width,
    ratio: DBmbImageParamDesc.ratio,
    borderRadius: DBmbImageParamDesc.borderRadius,
    loading: DBmbImageParamDesc.loading,
    enableZoom: DBmbImageParamDesc.enableZoom,
    isBlurredBackdrop: DBmbImageParamDesc.isBlurredBackdrop,
  },
  args: {
    src: 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
    mobileSrc:
      'https://2.bp.blogspot.com/-YkNDZEbKt_g/TYzcbF2_tkI/AAAAAAAAalk/Vt_MHS60Xv8/s1600/www.JoseLuisAvilaHerrera.BLOGSPOT.com%2B-%2BFunny%2BCats%2B-%2BGatitos%2Bmuy%2Btiernos%2B8.jpg',
    alt: 'Fruits',
    width: 'clamp(200px, 100%, calc(50vw - 3rem))',
    ratio: '1/1',
    borderRadius: 'm',
    loading: 'lazy',
    enableZoom: false,
    isBlurredBackdrop: false,
  },
} as Meta<typeof BmbImageComponent>;

type Story = StoryObj<BmbImageComponent>;

export const Default: Story = {};
