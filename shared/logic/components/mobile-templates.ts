import { IBmbMobileTemplateName } from '../../types/components/mobile-templates';

export function getMobileTemplateClassList(
  template: IBmbMobileTemplateName,
): string[] {
  return ['bmb_mobile-template', `bmb_mobile-template-${template}`];
}
