import { CertificateIcon } from '@storybook/icons';
import COLOR_GROUP_NAMES from './color-group-names.json';
export const bmb_badge_type = JSON.parse({
  ...COLOR_GROUP_NAMES['creative_use_colors'],
  ...COLOR_GROUP_NAMES['semantic_colors'],
  ...COLOR_GROUP_NAMES['mitec_institutional_colors'],
});
