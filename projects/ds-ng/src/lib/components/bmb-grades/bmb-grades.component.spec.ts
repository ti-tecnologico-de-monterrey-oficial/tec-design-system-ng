import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbGradesComponent } from './bmb-grades.component';

describe('BmbGradesComponent', () => {
  let component: BmbGradesComponent;
  let fixture: ComponentFixture<BmbGradesComponent>;
  let componentRef: ComponentRef<BmbGradesComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
