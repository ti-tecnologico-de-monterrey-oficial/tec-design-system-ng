import { TestBed } from '@angular/core/testing';
import { BmbFilterCardComponent } from './bmb-filter-card.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbModalComponent } from '../bmb-modal/bmb-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { IBmbControlType } from './bmb-filter-card.interface';

describe('BmbFilterCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        BmbIconComponent,
        BmbModalComponent,
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BmbFilterCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render filter card', () => {
    const fixture = TestBed.createComponent(BmbFilterCardComponent);

    // Use setInput method for assigning signal inputs
    fixture.componentRef.setInput('modalTitle', 'Opciones Filtrado');
    fixture.componentRef.setInput('primaryBtnLabel', 'Aplicar Filtros');
    fixture.componentRef.setInput('secondaryBtnLabel', 'Limpiar Filtros');
    fixture.componentRef.setInput('icon', 'tune');
    fixture.componentRef.setInput('placeholderSearch', 'Search');
    fixture.componentRef.setInput('controlTypes', [
      {
        title: 'Filter - Radial',
        control: [
          {
            name: 'radial-1',
            type: 'radial',
            label: 'Radial 1',
            checked: false,
          },
          {
            name: 'radial-2',
            type: 'radial',
            label: 'Radial 2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Checkbox',
        control: [
          {
            name: 'checkbox-1',
            type: 'checkbox',
            label: 'Checkbox 1',
            checked: false,
          },
          {
            name: 'checkbox-2',
            type: 'checkbox',
            label: 'Checkbox 2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Switch',
        control: [
          {
            name: 'switch-1',
            type: 'switch',
            rightText: 'Switch 1',
            checked: false,
          },
        ],
      },
    ] as IBmbControlType[]);

    fixture.detectChanges();
    const filterCardElement =
      fixture.nativeElement.querySelector('.bmb_filter_card');
    expect(filterCardElement).toBeTruthy();
  });

  it('should render filter card modal', () => {
    const fixture = TestBed.createComponent(BmbFilterCardComponent);

    // Use setInput method for assigning signal inputs
    fixture.componentRef.setInput('modalTitle', 'Opciones Filtrado');
    fixture.componentRef.setInput('primaryBtnLabel', 'Aplicar Filtros');
    fixture.componentRef.setInput('secondaryBtnLabel', 'Limpiar Filtros');
    fixture.componentRef.setInput('icon', 'tune');
    fixture.componentRef.setInput('placeholderSearch', 'Search');
    fixture.componentRef.setInput('controlTypes', [
      {
        title: 'Filter - Radial',
        control: [
          {
            name: 'radial-1',
            type: 'radial',
            label: 'Radial 1',
            checked: false,
          },
          {
            name: 'radial-2',
            type: 'radial',
            label: 'Radial 2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Checkbox',
        control: [
          {
            name: 'checkbox-1',
            type: 'checkbox',
            label: 'Checkbox 1',
            checked: false,
          },
          {
            name: 'checkbox-2',
            type: 'checkbox',
            label: 'Checkbox 2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Switch',
        control: [
          {
            name: 'switch-1',
            type: 'switch',
            rightText: 'Switch 1',
            checked: false,
          },
        ],
      },
    ] as IBmbControlType[]);

    fixture.detectChanges();
    const filterCardModalElement = fixture.nativeElement.querySelector(
      '.bmb_filter_card-modal',
    );
    expect(filterCardModalElement).toBeTruthy();
  });

  it('should render filter card controls', () => {
    const fixture = TestBed.createComponent(BmbFilterCardComponent);

    // Use setInput method for assigning signal inputs
    fixture.componentRef.setInput('modalTitle', 'Opciones Filtrado');
    fixture.componentRef.setInput('primaryBtnLabel', 'Aplicar Filtros');
    fixture.componentRef.setInput('secondaryBtnLabel', 'Limpiar Filtros');
    fixture.componentRef.setInput('icon', 'tune');
    fixture.componentRef.setInput('placeholderSearch', 'Search');
    fixture.componentRef.setInput('controlTypes', [
      {
        title: 'Filter - Radial',
        control: [
          {
            name: 'radial-1',
            type: 'radial',
            label: 'Radial 1',
            checked: false,
          },
          {
            name: 'radial-2',
            type: 'radial',
            label: 'Radial 2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Checkbox',
        control: [
          {
            name: 'checkbox-1',
            type: 'checkbox',
            label: 'Checkbox 1',
            checked: false,
          },
          {
            name: 'checkbox-2',
            type: 'checkbox',
            label: 'Checkbox 2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Switch',
        control: [
          {
            name: 'switch-1',
            type: 'switch',
            rightText: 'Switch 1',
            checked: false,
          },
        ],
      },
    ] as IBmbControlType[]);

    fixture.detectChanges();
    const filterCardControls = fixture.nativeElement.querySelectorAll(
      '.bmb_filter_card-control',
    );
    expect(filterCardControls.length).toBe(4);
  });
});
