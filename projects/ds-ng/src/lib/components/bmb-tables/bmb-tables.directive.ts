import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[templateName]',
})
export class TemplateNameDirective {
  @Input() templateName!: string;

  constructor(public template: TemplateRef<any>) {}
}
