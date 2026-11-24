import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbGradesComponent } from './bmb-grades.component';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';

describe('BmbGradesComponent', () => {
  let component: BmbGradesComponent;
  let fixture: ComponentFixture<BmbGradesComponent>;
  let componentRef: ComponentRef<BmbGradesComponent>;

  afterEach(() => jest.restoreAllMocks());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbGradesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbGradesComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('grades', [
      {
        title: 'Calificaciones 2022',
        subtitle: 'Semestrales 2022',
        periods: [
          {
            detail: {
              title: 'Semestral X - Y',
              subtitle: 'Z materias acreditadas',
              score: 100,
            },
            accreditedClasses: 7,
            periodAverage: 99,
            serviceHours: 46,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 1',
                  subtitle: 'TC-100000',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1',
                    score: 100,
                  },
                ],
              },
            ],
          },
          {
            detail: {
              title: 'Semestral Y - Z',
              subtitle: 'Z materias acreditadas',
              score: 100,
            },
            accreditedClasses: 6,
            periodAverage: 100,
            serviceHours: 49.5,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 2',
                  subtitle: 'TC-100000',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1',
                    score: 100,
                  },
                  {
                    title: 'Parcial 2',
                    score: 99,
                  },
                ],
              },
              {
                detail: {
                  title: 'Nombre de clase 3',
                  subtitle: 'TC-100002',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1',
                    score: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Calificaciones 2023',
        subtitle: 'Semestrales 2023',
        periods: [
          {
            detail: {
              title: 'Semestral X - Y  2023',
              subtitle: 'Z materias acreditadas',
              score: 100,
            },
            accreditedClasses: 7,
            periodAverage: 99,
            serviceHours: 46,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 1  2023',
                  subtitle: 'TC-100000',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1  2023',
                    score: 100,
                  },
                ],
              },
            ],
          },
          {
            detail: {
              title: 'Semestral Y - Z  2023 ',
              subtitle: 'Z materias acreditadas  2023',
              score: 100,
            },
            accreditedClasses: 6,
            periodAverage: 100,
            serviceHours: 49.5,
            classes: [
              {
                detail: {
                  title: 'Nombre de clase 2  2023',
                  subtitle: 'TC-100000  2023',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1  2023',
                    score: 100,
                  },
                  {
                    title: 'Parcial 2  2023',
                    score: 99,
                  },
                ],
              },
              {
                detail: {
                  title: 'Nombre de clase 3  2023',
                  subtitle: 'TC-100002',
                  score: 100,
                },
                partials: [
                  {
                    title: 'Parcial 1  2023',
                    score: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
    componentRef.setInput('gradeTitle', 'Período actual');
    componentRef.setInput('title', 'Semestral AGO-DIC 2024');
    componentRef.setInput('accredited', {
      name: 'Créditos aprobados',
      value: '39',
    });
    componentRef.setInput('average', {
      name: 'Promedio acumulado',
      value: '90',
    });
    componentRef.setInput('summary', { name: 'Faltas totales', value: '3' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validates required inputs for the micro view', () => {
    componentRef.setInput('isMicro', true);
    expect(() => component.ngOnInit()).not.toThrow();
    componentRef.setInput('gradeTitle', undefined);
    expect(() => component.ngOnInit()).toThrow(/gradeTitle/);
  });

  it('keeps modal content empty when the detail template is unavailable', () => {
    component.detailContent = undefined;
    component.modalContent = null;
    component.ngAfterViewInit();
    expect(component.modalContent).toBeNull();
  });
  it('shows period summaries and drills into their classes', () => {
    const period = component.grades()[0].periods[0];
    component.showPrincipalDetail = false;
    expect(component.getGradesTitle()).toBe('Calificaciones 2022');
    expect(component.getTitle()).toBe('Semestrales 2022');
    expect(component.getCalendarIcon()).toBe('calendar_today');
    expect(component.getAccreditedClasses()).toBe(0);
    expect(component.getPeriodAverage()).toBe(0);
    expect(component.getServiceHours()).toBe(0);
    expect(component.getElements()).toEqual(component.grades()[0].periods);
    expect(component.getDetailTitle(period)).toBe(period.detail.title);
    expect(component.getDetailSubtitle(period)).toBe(period.detail.subtitle);
    expect(component.getDetailScore(period)).toBe(period.detail.score);
    component.handleDetails(period);
    expect(component.showPrincipalDetail).toBe(true);
    expect(component.periodIndex()).toBe(0);
    expect(component.getTitle()).toBe(period.detail.title);
    expect(component.getCalendarIcon()).toBe('calendar_month');
    expect(component.getAccreditedClasses()).toBe(7);
    expect(component.getPeriodAverage()).toBe(99);
    expect(component.getServiceHours()).toBe(46);
    expect(component.getElements()).toEqual(period.classes);
    component.handleRightGradesClick();
    expect(component.showPrincipalDetail).toBe(false);
  });

  it('opens the selected class partials in the modal', () => {
    const open = jest
      .spyOn(TestBed.inject(BmbNativeModalService), 'openModal')
      .mockReturnValue('grade-detail');
    const selectedClass = component.grades()[0].periods[0].classes[0];
    component.showPrincipalDetail = true;
    component.handleDetails(selectedClass);
    expect(component.partials).toEqual(selectedClass.partials);
    expect(open).toHaveBeenCalledWith(
      expect.objectContaining({
        title: selectedClass.detail.title,
        subtitle: selectedClass.detail.subtitle,
        content: component.modalContent,
        size: 'small',
      }),
    );
  });

  it('emits the close event to the host', () => {
    const close = jest.spyOn(component.closeGrades, 'emit');
    const event = new MouseEvent('click');
    component.handleLeftGradesClick(event);
    expect(close).toHaveBeenCalledWith(event);
  });
  it('preserves period and grade navigation boundaries after extraction', () => {
    component.handleLeftPeriodClick();
    expect(component.gradeIndex()).toBe(0);
    for (let i = 0; i < 10; i++) component.handleRightPeriodClick();
    expect(component.gradeIndex()).toBe(component.grades().length - 1);
    component.showPrincipalDetail = true;
    component.periodIndex.set(0);
    component.handleLeftPeriodClick();
    expect(component.periodIndex()).toBe(0);
    for (let i = 0; i < 10; i++) component.handleRightPeriodClick();
    expect(component.periodIndex()).toBe(
      component.grades()[component.gradeIndex()].periods.length - 1,
    );
  });
});
