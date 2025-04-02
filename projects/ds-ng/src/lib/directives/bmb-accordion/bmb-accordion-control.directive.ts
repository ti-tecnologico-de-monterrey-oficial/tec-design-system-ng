import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[bmbAccordionControl]',
  standalone: true,
})
export class BmbAccordionControlDirective implements OnInit {
  private accordions: any[] = [];
  private openAccordion: number | null = null;

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
    const idAccordion = selectedAccordion
      ?.closest('bmb-accordion')
      ?.getAttribute('ng-reflect-accordion-id');

    if (this.openAccordion !== Number(idAccordion)) {
      this.openAccordion = Number(idAccordion);
      this.accordions.forEach((accordion: any) => {
        if (accordion.querySelector('section') !== selectedAccordion) {
          const content = accordion
            .querySelector('section')
            .querySelector('section');
          const header = accordion
            .querySelector('section')
            .querySelector('header');
          const section = accordion.querySelector('section');

          this.renderer.removeClass(section, 'active');
          this.renderer.removeClass(content, 'bmb_accordion-content-open');
          this.renderer.removeClass(header, 'bmb_accordion-header-open');
        } else {
          const header = accordion
            .querySelector('section')
            .querySelector('header');
          const content = accordion
            .querySelector('section')
            .querySelector('section');
          const section = accordion.querySelector('section');

          this.renderer.addClass(section, 'active');
          this.renderer.addClass(content, 'bmb_accordion-content-open');
          this.renderer.addClass(header, 'bmb_accordion-header-open');
        }
      });
    }
  }
}
