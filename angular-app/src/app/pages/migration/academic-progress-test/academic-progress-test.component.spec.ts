import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcademicProgressTestComponent } from './academic-progress-test.component';

describe('AcademicProgressTestComponent', () => {
  let fixture: ComponentFixture<AcademicProgressTestComponent>;
  const values = () =>
    Array.from(
      fixture.nativeElement.querySelectorAll('.bmb_focus-element-number'),
    ).map((element) => (element as HTMLElement).textContent?.trim());
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
      imports: [AcademicProgressTestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AcademicProgressTestComponent);
    await fixture.whenStable();
  });

  it('updates all metrics from the numeric controls', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');
    ['80', '98.7', '200'].forEach((value, index) => {
      inputs[index].value = value;
      inputs[index].dispatchEvent(new Event('input'));
    });
    fixture.detectChanges();
    expect(values()).toEqual(['80', '98.7', '200']);
  });

  it('renders zero, legacy and reset scenarios through the buttons', () => {
    click('Mostrar ceros');
    expect(values()).toEqual(['0', '0', '0']);
    click('Probar texto y booleano');
    expect(values()).toEqual(['120', '95.5', 'true']);
    click('Restablecer');
    expect(values()).toEqual(['120', '95.5', '240']);
  });
});
