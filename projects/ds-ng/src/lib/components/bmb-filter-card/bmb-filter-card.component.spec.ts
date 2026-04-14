import { TestBed } from '@angular/core/testing';
import { BmbFilterCardComponent } from './bmb-filter-card.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
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
            openModal: () => {},
            closeModal: () => {},
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

    it('should match optionRule by semantic value when radial label differs from value', () => {
      const controlTypesWithValue: IBmbControlType[] = [
        {
          title: 'Campus',
          control: [
            { name: 'campusSem', type: 'radial', label: 'Monterrey', value: 'MTY', id: 'sem-mty' },
            { name: 'campusSem', type: 'radial', label: 'Guadalajara', value: 'GDL', id: 'sem-gdl' },
          ],
        },
        {
          title: 'Carrera',
          control: [{ name: 'carreraSem', type: 'dropdown', label: 'Carrera', options: [] }],
        },
      ];
      const rules: IBmbOptionRule[] = [
        { when: { campusSem: 'MTY' }, target: 'carreraSem', options: ['Ingeniería', 'Medicina'] },
        { when: { campusSem: 'GDL' }, target: 'carreraSem', options: ['Arquitectura', 'Diseño'] },
      ];

      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', controlTypesWithValue);
      fixture.componentRef.setInput('optionRules', rules);
      fixture.detectChanges();

      // Selecting Monterrey stores semantic value 'MTY' in filterValues, not display label 'Monterrey'
      component.controlChange(
        { name: 'campusSem', type: 'radial', label: 'Monterrey', value: 'MTY' },
        { checked: true },
      );
      fixture.detectChanges();

      const carreraControl = controlTypesWithValue[1].control[0];
      expect(component.getControlOptions(carreraControl)).toEqual(['Ingeniería', 'Medicina']);
    });

    it('should seed filterValues with semantic value on init when radial is pre-checked with value != label', () => {
      const controlTypesPreChecked: IBmbControlType[] = [
        {
          title: 'Campus',
          control: [
            { name: 'campusPre', type: 'radial', label: 'Monterrey', value: 'MTY', checked: true, id: 'pre-mty' },
            { name: 'campusPre', type: 'radial', label: 'Guadalajara', value: 'GDL', id: 'pre-gdl' },
          ],
        },
        {
          title: 'Carrera',
          control: [{ name: 'carreraPre', type: 'dropdown', label: 'Carrera', options: [] }],
        },
      ];
      const rules: IBmbOptionRule[] = [
        { when: { campusPre: 'MTY' }, target: 'carreraPre', options: ['Ingeniería', 'Medicina'] },
      ];

      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', controlTypesPreChecked);
      fixture.componentRef.setInput('optionRules', rules);
      fixture.detectChanges();

      // Without the fix, filterValues['campusPre'] would be 'Monterrey' (label) and the rule wouldn't match
      const carreraControl = controlTypesPreChecked[1].control[0];
      expect(component.getControlOptions(carreraControl)).toEqual(['Ingeniería', 'Medicina']);
    });
  });

  describe('Additional Coverage: Modal, Submit, and Control Changes', () => {
    it('should open modal when openModalComponent is called', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      const modalSpy = spyOn(component['modalService'], 'openModal').and.returnValue('modal-123');
      
      component.openModalComponent();
      
      expect(modalSpy).toHaveBeenCalled();
      expect(component.modalId()).toBe('modal-123');
    });

    it('should submit form data and close modal on handleSubmit', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      const closeSpy = spyOn(component['modalService'], 'closeModal');
      const emitSpy = spyOn(component.applyFilters, 'emit');
      
      // Need to invoke detectChanges to initialize the form
      fixture.detectChanges();
      
      component.modalId.set('modal-123');
      component.storedValues = {
        'checkbox-1': { type: 'checkbox', name: 'checkbox-1', checked: true },
        'radial-1': { type: 'radial', name: 'radial-1', checked: true },
        'dropdown-1': { type: 'dropdown', name: 'dropdown-1', checked: false, value: 'option A' },
      };
      
      component.filterForm.addControl('dropdown-1', new FormControl('option A'));
      // Simulate search input value
      component.filterForm.get('search')?.setValue('test search');
      
      component.handleSubmit();
      
      expect(closeSpy).toHaveBeenCalledWith('modal-123');
      expect(emitSpy).toHaveBeenCalledWith(jasmine.objectContaining({
        'checkbox-1': jasmine.any(Object),
        'radial-1': jasmine.any(Object),
        search: 'test search'
      }));
    });

    it('should handle switch control change', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', [{ title: 'T', control: [{ name: 'sw', type: 'switch' }] }]);
      fixture.detectChanges();
      
      component.controlChange({ name: 'sw', type: 'switch' }, true);
      expect(component.filterForm.get('sw')?.value).toBeTrue();
      expect(component.storedValues['sw'].checked).toBeTrue();
    });

    it('should handle checkbox control change', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', [{ title: 'T', control: [{ name: 'chk', type: 'checkbox' }] }]);
      fixture.detectChanges();
      
      component.controlChange({ name: 'chk', type: 'checkbox' }, { target: { checked: true } });
      expect(component.filterForm.get('chk')?.value).toBeTrue();
      expect(component.storedValues['chk'].checked).toBeTrue();
    });

    it('should handle dropdown control change', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', [{ title: 'T', control: [{ name: 'drop', type: 'dropdown', options: ['A','B'] }] }]);
      fixture.detectChanges();
      
      component.controlChange({ name: 'drop', type: 'dropdown', value: 'B' }, 'B');
      expect(component.filterForm.get('drop')?.value).toBe('B');
      expect(component.storedValues['drop'].value).toBe('B');
    });

    it('should handle tag/default control change', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', [{ title: 'T', control: [{ name: 'tag1', type: 'tag' }] }]);
      fixture.detectChanges();
      
      component.controlChange({ name: 'tag1', type: 'tag' }, null);
      expect(component.filterForm.get('tag1')?.value).toBeTrue();
      expect(component.storedValues['tag1'].checked).toBeTrue();
    });

    it('should handle multiple radial inputs with the same name in ngOnInit', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', [{
        title: 'T',
        control: [
          { name: 'rad1', type: 'radial', label: 'R1', value: 'V1', checked: false },
          { name: 'rad1', type: 'radial', label: 'R2', value: 'V2', checked: true }
        ]
      }]);
      fixture.detectChanges();
      expect(component.filterForm.get('rad1')?.value).toBe('R2');
      expect(component.storedValues['rad1'].checked).toBeTrue();
      expect(component.storedValues['rad1'].value).toBe('V2');
    });

    it('should handle getFormControl', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      const control = component.getFormControl('search');
      expect(control).toBeTruthy();
    });

    it('should log error for unsupported control type', () => {
      const consoleSpy = spyOn(console, 'error');
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', [{ title: 'T', control: [{ name: 'inv', type: 'invalid' as any }] }]);
      fixture.detectChanges();
      expect(consoleSpy).toHaveBeenCalledWith('Control type not supported');
    });

    it('should ignore control change if formControl is missing', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      fixture.componentRef.setInput('controlTypes', [{ title: 'T', control: [{ name: 'chk', type: 'checkbox' }] }]);
      fixture.detectChanges();
      
      component.filterForm.removeControl('chk');
      component.controlChange({ name: 'chk', type: 'checkbox' }, { target: { checked: true } });
      
      expect(component.filterForm.get('chk')).toBeNull();
    });

    it('should explicitly emit reset event on onReset', () => {
      const fixture = TestBed.createComponent(BmbFilterCardComponent);
      const component = fixture.componentInstance;
      const emitSpy = spyOn(component.resetFilters, 'emit');
      fixture.detectChanges();
      
      component.onReset();
      expect(emitSpy).toHaveBeenCalled();
    });
  });
});
