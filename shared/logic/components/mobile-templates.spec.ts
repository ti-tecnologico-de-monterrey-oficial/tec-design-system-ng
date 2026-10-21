import { getMobileTemplateClassList } from './mobile-templates';

describe('getMobileTemplateClassList', () => {
  it('should return the base class and the template-specific class', () => {
    expect(getMobileTemplateClassList('single-header')).toEqual([
      'bmb_mobile-template',
      'bmb_mobile-template-single-header',
    ]);
  });

  it('should reflect a different template name', () => {
    expect(getMobileTemplateClassList('calendar')).toEqual([
      'bmb_mobile-template',
      'bmb_mobile-template-calendar',
    ]);
  });
});
