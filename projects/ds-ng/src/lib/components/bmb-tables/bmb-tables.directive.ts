import { Directive, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[templateName]',
})
export class TemplateNameDirective {
  templateName = input.required<string>();

  constructor(public template: TemplateRef<any>) {}
}
