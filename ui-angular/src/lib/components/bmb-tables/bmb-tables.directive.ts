import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[templateName]',
})
export class TemplateNameDirective {
  templateName = input.required<string>();

  public template: TemplateRef<any> = inject(TemplateRef);
}
