import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderMitecTestComponent } from './header-mitec-test.component';

describe('HeaderMitecTestComponent', () => {
  let fixture: ComponentFixture<HeaderMitecTestComponent>;
  const click = (label: string) => {
    const button = (
      Array.from(
        fixture.nativeElement.querySelectorAll('button'),
      ) as HTMLButtonElement[]
    ).find((element) => element.textContent?.trim() === label)!;
    button.click();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMitecTestComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderMitecTestComponent);
    await fixture.whenStable();
  });

  it('projects content and updates and removes links through the page controls', () => {
    expect(
      fixture.nativeElement.querySelector('bmb-header-mitec h2').textContent,
    ).toContain('Bienvenido a MiTec');
    click('Actualizar enlaces');
    expect(
      fixture.nativeElement.querySelectorAll('bmb-header-mitec a'),
    ).toHaveLength(6);
    expect(fixture.nativeElement.querySelector('bmb-header-mitec a').href).toBe(
      'https://example.com/apple?v=1',
    );
    click('Actualizar enlaces');
    expect(fixture.nativeElement.querySelector('bmb-header-mitec a').href).toBe(
      'https://example.com/apple?v=2',
    );
    click('Quitar enlaces');
    expect(
      fixture.nativeElement.querySelectorAll('bmb-header-mitec a'),
    ).toHaveLength(0);
    expect(fixture.nativeElement.textContent).toContain(
      'Sin enlaces configurados.',
    );
  });

  it('changes the rendered label through the input', () => {
    const input = fixture.nativeElement.querySelector(
      'input',
    ) as HTMLInputElement;
    input.value = 'COLABORADORES';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('bmb-mitec-logo-animation')
        .textContent,
    ).toContain('COLABORADORES');
    click('Usar etiqueta predeterminada');
    expect(fixture.componentInstance.headerLabel()).toBe('');
    expect(
      fixture.nativeElement.querySelector('bmb-mitec-logo-animation')
        .textContent,
    ).not.toContain('COLABORADORES');
  });
});
