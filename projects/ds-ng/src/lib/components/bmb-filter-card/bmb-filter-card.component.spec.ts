import { TestBed } from '@angular/core/testing';
import { BmbFilterCardComponent } from './bmb-filter-card.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  IBmbControlType,
  IBmbOptionRule,
  IBmbVisibilityRule,
} from './bmb-filter-card.interface';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';

describe('BmbFilterCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, BmbIconComponent],
      providers: [
        {
          provide: BmbNativeModalService,
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

  describe('Conditional Filters (visibilityRules)', () => {
    const baseControlTypes: IBmbControlType[] = [
      {
        title: 'Nivel',
        control: [
          { name: 'nivel', type: 'radial', label: 'Profesional' },
          { name: 'nivel', type: 'radial', label: 'Preparatoria' },
        ],
      },
      {
        title: 'Tipo de evaluación',
        control: [
          { name: 'tipoEval', type: 'radial', label: 'Parcial' },
          { name: 'tipoEval', type: 'radial', label: 'Final' },
        ],
      },
      {
        title: 'Departamentos',
        control: [{ name: 'deptos', type: 'tag', label: 'Depto A' }],
      },
    ];

    const visibilityRules: IBmbVisibilityRule[] = [
      {
        when: { nivel: 'Profesional' },
        show: ['tipoEval'],
        hide: ['deptos'],
      },
      {
        when: { nivel: 'Preparatoria' },
        show: ['deptos'],
        hide: ['tipoEval'],
      },
    ];

    it('should show all controls when no visibilityRules are provided', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', baseControlTypes);
      fixture.detectChanges();

      expect(component.isControlVisible('tipoEval')).toBeTrue();
      expect(component.isControlVisible('deptos')).toBeTrue();
    });

    it('should hide controls matching hide list when when-condition is met', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', baseControlTypes);
      fixture.componentRef.setInput('visibilityRules', visibilityRules);
      fixture.detectChanges();

      component.controlChange({ name: 'nivel', type: 'radial', label: 'Profesional' }, { checked: true });
      fixture.detectChanges();

      expect(component.isControlVisible('tipoEval')).toBeTrue();
      expect(component.isControlVisible('deptos')).toBeFalse();
    });

    it('should show controls matching show list and hide others when when-condition changes', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', baseControlTypes);
      fixture.componentRef.setInput('visibilityRules', visibilityRules);
      fixture.detectChanges();

      component.controlChange({ name: 'nivel', type: 'radial', label: 'Preparatoria' }, { checked: true });
      fixture.detectChanges();

      expect(component.isControlVisible('deptos')).toBeTrue();
      expect(component.isControlVisible('tipoEval')).toBeFalse();
    });

    it('should clear form value of a control when it is hidden', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', baseControlTypes);
      fixture.componentRef.setInput('visibilityRules', visibilityRules);
      fixture.detectChanges();

      component.controlChange({ name: 'tipoEval', type: 'radial', label: 'Parcial' }, { checked: true });
      fixture.detectChanges();

      component.controlChange({ name: 'nivel', type: 'radial', label: 'Preparatoria' }, { checked: true });
      fixture.detectChanges();

      expect(component.filterForm.get('tipoEval')?.value).toBeFalsy();
    });

    it('should hide a section title when all its controls are hidden', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', baseControlTypes);
      fixture.componentRef.setInput('visibilityRules', visibilityRules);
      fixture.detectChanges();

      component.controlChange({ name: 'nivel', type: 'radial', label: 'Profesional' }, { checked: true });
      fixture.detectChanges();

      const deptosSection = baseControlTypes.find(ct =>
        ct.control.some(c => c.name === 'deptos'),
      )!;
      expect(component.isSectionVisible(deptosSection)).toBeFalse();
    });

    it('should reset visibility when onReset is called', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', baseControlTypes);
      fixture.componentRef.setInput('visibilityRules', visibilityRules);
      fixture.detectChanges();

      component.controlChange({ name: 'nivel', type: 'radial', label: 'Profesional' }, { checked: true });
      fixture.detectChanges();

      component.onReset();
      fixture.detectChanges();

      expect(component.isControlVisible('tipoEval')).toBeTrue();
      expect(component.isControlVisible('deptos')).toBeTrue();
    });
  });

  describe('Cascading Filters (optionRules)', () => {
    const cascadeControlTypes: IBmbControlType[] = [
      {
        title: 'Campus',
        control: [
          { name: 'campus', type: 'radial', label: 'Monterrey' },
          { name: 'campus', type: 'radial', label: 'Guadalajara' },
        ],
      },
      {
        title: 'Carrera',
        control: [
          {
            name: 'carrera',
            type: 'dropdown',
            label: 'Carrera',
            options: [],
          },
        ],
      },
    ];

    const monterreyOptions = ['Ingeniería', 'Negocios', 'Medicina'];
    const guadalajaraOptions = ['Arquitectura', 'Diseño'];

    const optionRules: IBmbOptionRule[] = [
      { when: { campus: 'Monterrey' }, target: 'carrera', options: monterreyOptions },
      { when: { campus: 'Guadalajara' }, target: 'carrera', options: guadalajaraOptions },
    ];

    it('should return static options when no optionRules are provided', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', cascadeControlTypes);
      fixture.detectChanges();

      const carreraControl = cascadeControlTypes[1].control[0];
      expect(component.getControlOptions(carreraControl)).toEqual([]);
    });

    it('should return dynamic options when when-condition is met', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', cascadeControlTypes);
      fixture.componentRef.setInput('optionRules', optionRules);
      fixture.detectChanges();

      component.controlChange({ name: 'campus', type: 'radial', label: 'Monterrey' }, { checked: true });
      fixture.detectChanges();

      const carreraControl = cascadeControlTypes[1].control[0];
      expect(component.getControlOptions(carreraControl)).toEqual(monterreyOptions);
    });

    it('should update dynamic options when source control changes', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', cascadeControlTypes);
      fixture.componentRef.setInput('optionRules', optionRules);
      fixture.detectChanges();

      component.controlChange({ name: 'campus', type: 'radial', label: 'Monterrey' }, { checked: true });
      fixture.detectChanges();

      component.controlChange({ name: 'campus', type: 'radial', label: 'Guadalajara' }, { checked: true });
      fixture.detectChanges();

      const carreraControl = cascadeControlTypes[1].control[0];
      expect(component.getControlOptions(carreraControl)).toEqual(guadalajaraOptions);
    });

    it('should clear dependent dropdown value if current value is not in new options', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', cascadeControlTypes);
      fixture.componentRef.setInput('optionRules', optionRules);
      fixture.detectChanges();

      component.controlChange({ name: 'campus', type: 'radial', label: 'Monterrey' }, { checked: true });
      component.onValueChange('Ingeniería', 'carrera');
      fixture.detectChanges();

      expect(component.filterForm.get('carrera')?.value).toBe('Ingeniería');

      component.controlChange({ name: 'campus', type: 'radial', label: 'Guadalajara' }, { checked: true });
      fixture.detectChanges();

      expect(component.filterForm.get('carrera')?.value).toBeFalsy();
    });
  });
});
