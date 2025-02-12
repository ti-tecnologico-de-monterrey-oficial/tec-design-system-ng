import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[bmbAccordionControl]',
  standalone: true,
})
export class BmbAccordionControlDirective implements OnInit {
  private accordions: any[] = [];

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.accordions = Array.from(
      this.el.nativeElement.querySelectorAll('bmb-accordion'),
    );
  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    const parent = event.target as HTMLElement;
    const selectedAccordion = parent.closest('section');

    this.accordions.forEach((accordion: any) => {
      if (accordion.querySelector('section') !== selectedAccordion) {
        const content = accordion
          .querySelector('section')
          .querySelector('section');
        this.renderer.removeClass(content, 'bmb_accordion-content-open');
      } else {
        const content = accordion
          .querySelector('section')
          .querySelector('section');
        this.renderer.addClass(content, 'bmb_accordion-content-open');
      }
    });
  }
}
