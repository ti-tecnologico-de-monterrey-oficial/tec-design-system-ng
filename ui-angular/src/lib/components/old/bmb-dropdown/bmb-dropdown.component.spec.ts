import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import {
  BmbDropdownComponent,
  IBmbDropdownItem,
} from './bmb-dropdown.component';
import { BmbProjectionContentService } from '../../services/projection/projection.service';

describe('BmbDropdownComponent', () => {
  let component: BmbDropdownComponent;
  let fixture: ComponentFixture<BmbDropdownComponent>;
  let projectionService: jasmine.SpyObj<BmbProjectionContentService>;

  const mockStringOptions = ['Option 1', 'Option 2', 'Option 3'];
  const mockObjectOptions: IBmbDropdownItem[] = [
    { name: 'First Option', value: 'first', icon: 'home' },
    { name: 'Second Option', value: 'second', icon: 'star' },
    { name: 'Third Option', value: 'third', icon: 'favorite' },
  ];

  beforeEach(async () => {
    const projectionServiceSpy = jasmine.createSpyObj(
      'BmbProjectionContentService',
      ['openContent', 'closeContent', 'isContentOpen'],
    );

    await TestBed.configureTestingModule({
      imports: [BmbDropdownComponent],
      providers: [
        {
          provide: BmbProjectionContentService,
          useValue: projectionServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbDropdownComponent);
    component = fixture.componentInstance;
    projectionService = TestBed.inject(
      BmbProjectionContentService,
    ) as jasmine.SpyObj<BmbProjectionContentService>;
  });

  describe('Component Creation', () => {
    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      fixture.detectChanges();

      expect(component.required()).toBeFalse();
      expect(component.showIcon()).toBeFalse();
      expect(component.placeholder()).toBe('');
      expect(component.icon()).toBe('');
      expect(component.options()).toEqual([]);
      expect(component.isMultiSelect()).toBeFalse();
      expect(component.disabled()).toBeFalse();
      expect(component.isFilterable()).toBeFalse();
    });
  });

  describe('Input Properties', () => {
    it('should set required property', () => {
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      expect(component.required()).toBeTrue();
    });

    it('should set placeholder', () => {
      const placeholder = 'Select an option';
      fixture.componentRef.setInput('placeholder', placeholder);
      fixture.detectChanges();

      expect(component.placeholder()).toBe(placeholder);
    });

    it('should set label', () => {
      const label = 'Choose Option';
      fixture.componentRef.setInput('label', label);
      fixture.detectChanges();

      expect(component.label()).toBe(label);
    });

    it('should set icon and showIcon', () => {
      const icon = 'home';
      fixture.componentRef.setInput('icon', icon);
      fixture.componentRef.setInput('showIcon', true);
      fixture.detectChanges();

      expect(component.icon()).toBe(icon);
      expect(component.showIcon()).toBeTrue();
    });

    it('should set disabled property', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(component.disabled()).toBeTrue();
    });

    it('should set multiselect mode', () => {
      fixture.componentRef.setInput('isMultiSelect', true);
      fixture.detectChanges();

      expect(component.isMultiSelect()).toBeTrue();
    });

    it('should set filterable mode', () => {
      fixture.componentRef.setInput('isFilterable', true);
      fixture.detectChanges();

      expect(component.isFilterable()).toBeTrue();
    });
  });

  describe('Options Processing', () => {
    it('should process string array options', () => {
      fixture.componentRef.setInput('options', mockStringOptions);
      fixture.detectChanges();

      const parsedOptions = component.parsedOptions();
      expect(parsedOptions).toHaveSize(3);
      expect(parsedOptions[0].text).toBe('Option 1');
      expect(parsedOptions[0].value).toBe('Option 1');
    });

    it('should process object array options', () => {
      fixture.componentRef.setInput('options', mockObjectOptions);
      fixture.detectChanges();

      const parsedOptions = component.parsedOptions();
      expect(parsedOptions).toHaveSize(3);
      expect(parsedOptions[0].text).toBe('First Option');
      expect(parsedOptions[0].value).toBe('first');
    });

    it('should handle preferred options', () => {
      fixture.componentRef.setInput('options', mockStringOptions);
      fixture.componentRef.setInput('preferredOptions', ['Option 2']);
      fixture.detectChanges();

      const parsedOptions = component.parsedOptions();
      expect(parsedOptions[0].value).toBe('Option 2');
    });

    it('should assign icons when showIcon is true', () => {
      fixture.componentRef.setInput('options', mockStringOptions);
      fixture.componentRef.setInput('showIcon', true);
      fixture.componentRef.setInput('icon', 'default_icon');
      fixture.detectChanges();

      const parsedOptions = component.parsedOptions();
      expect(parsedOptions[0].icon).toBe('default_icon');
    });
  });

  describe('Form Control Integration', () => {
    it('should create form control if not provided', () => {
      component.control.set(null as any);
      fixture.detectChanges();

      expect(component.control()).toBeInstanceOf(FormControl);
      expect(component.isControlNull).toBeTrue();
    });

    it('should use provided form control', () => {
      const customControl = new FormControl('initial');
      fixture.componentRef.setInput('control', customControl);
      fixture.detectChanges();

      expect(component.control()).toBe(customControl);
      expect(component.isControlNull).toBeFalse();
    });

    it('should handle custom validation', () => {
      const customValidator = Validators.required;
      fixture.componentRef.setInput('customValidation', customValidator);
      fixture.componentRef.setInput('required', true);
      fixture.detectChanges();

      expect(component.customValidation()).toBe(customValidator);
    });

    it('should reset array values for single select mode', () => {
      const control = new FormControl(['value1', 'value2']);
      fixture.componentRef.setInput('control', control);
      fixture.componentRef.setInput('isMultiSelect', false);
      fixture.detectChanges();

      expect(component.control()?.value).toBe('');
    });
  });

  describe('Selection Control', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('options', mockObjectOptions);
      fixture.detectChanges();
    });

    it('should set selection control for single select', () => {
      component.control()?.setValue('first');

      expect(component.selectionControl.value).toBe('First Option');
    });

    it('should set selection control for multi select', () => {
      fixture.componentRef.setInput('isMultiSelect', true);
      fixture.detectChanges();

      component.control()?.setValue(['first', 'second']);

      const selectionValue = component.selectionControl.value;

      expect(selectionValue.toString()).toEqual('First Option');
    });

    it('should update selected icon when showIcon is true', () => {
      fixture.componentRef.setInput('showIcon', true);
      fixture.detectChanges();

      component.control()?.setValue('first');

      expect(component.selectedIcon).toBe('home');
    });

    it('should clear selection control when value is empty', () => {
      component.control()?.setValue('');

      expect(component.selectionControl.value).toBe('');
    });
  });

  describe('Value Selection', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('options', mockObjectOptions);
      fixture.detectChanges();
    });

    it('should emit value change on selection for single select', () => {
      spyOn(component.onValueChange, 'emit');

      const element = component.parsedOptions()[0];
      component.setSelectedValue(element);

      expect(component.control()?.value).toBe('first');
      expect(component.onValueChange.emit).toHaveBeenCalledWith('first');
    });

    it('should handle multi select value changes', () => {
      fixture.componentRef.setInput('isMultiSelect', true);
      fixture.detectChanges();
      spyOn(component.onValueChange, 'emit');

      const element = component.parsedOptions()[0];
      component.setSelectedValue(element);

      expect(component.control()?.value).toContain('first');
      expect(component.onValueChange.emit).toHaveBeenCalled();
    });
  });

  describe('Dropdown Opening', () => {
    it('should open dropdown list', () => {
      fixture.componentRef.setInput('options', mockStringOptions);
      fixture.detectChanges();

      component.openList();

      expect(projectionService.openContent).toHaveBeenCalledWith(
        jasmine.objectContaining({
          fixSizeToRef: true,
          showBackdrop: false,
          focusOnOpen: true,
        }),
      );
    });

    it('should pass filterable configuration to dropdown content', () => {
      fixture.componentRef.setInput('isMultiSelect', false);
      fixture.componentRef.setInput('isFilterable', true);
      fixture.componentRef.setInput('options', mockStringOptions);
      fixture.detectChanges();

      component.openList();

      const call = projectionService.openContent.calls.mostRecent();
      expect(call.args[0]?.inputContext?.['enableFilter']).toBeTrue();
    });

    it('should pass custom filter function', () => {
      const customFilter = (item: any, filter: string) => true;
      fixture.componentRef.setInput('customFilterFunction', customFilter);
      fixture.componentRef.setInput('options', mockStringOptions);
      fixture.detectChanges();

      component.openList();

      const call = projectionService.openContent.calls.mostRecent();
      expect(call.args[0]?.inputContext?.['customFilterFunction']).toBe(
        customFilter,
      );
    });
  });

  describe('Keyboard Events', () => {
    it('should open list on space key', () => {
      spyOn(component, 'openList');

      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.onKeyDown(event);

      expect(component.openList).toHaveBeenCalled();
    });

    it('should open list on arrow down key', () => {
      spyOn(component, 'openList');

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);

      expect(component.openList).toHaveBeenCalled();
    });

    it('should open list on Down key', () => {
      spyOn(component, 'openList');

      const event = new KeyboardEvent('keydown', { key: 'Down' });
      component.onKeyDown(event);

      expect(component.openList).toHaveBeenCalled();
    });

    it('should not open list on other keys', () => {
      spyOn(component, 'openList');

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeyDown(event);

      expect(component.openList).not.toHaveBeenCalled();
    });
  });

  describe('Focus Handling', () => {
    it('should emit focus events', () => {
      spyOn(component.onFocus, 'emit');

      component.handleFocus(true);

      expect(component.onFocus.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('Icon Display', () => {
    it('should return selected icon for single select with showIcon', () => {
      fixture.componentRef.setInput('showIcon', true);
      fixture.componentRef.setInput('icon', 'default_icon');
      fixture.detectChanges();

      component.selectedIcon = 'selected_icon';

      expect(component.getIcon()).toBe('selected_icon');
    });

    it('should return default icon when no selection', () => {
      fixture.componentRef.setInput('showIcon', true);
      fixture.componentRef.setInput('icon', 'default_icon');
      fixture.detectChanges();

      component.selectedIcon = '';

      expect(component.getIcon()).toBe('default_icon');
    });

    it('should return empty string for multi select', () => {
      fixture.componentRef.setInput('isMultiSelect', true);
      fixture.componentRef.setInput('showIcon', true);
      fixture.detectChanges();

      expect(component.getIcon()).toBe('');
    });
  });

  describe('UUID Generation', () => {
    it('should generate unique ID with name', () => {
      const testName = 'test';
      const result = component.getUUID(testName);

      expect(result).toContain(testName);
      expect(result).toContain(component.name());
      expect(result).toContain(component.uuid);
    });
  });

  describe('Error Handling', () => {
    it('should show error when form control is invalid and touched', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      fixture.componentRef.setInput('control', control);
      fixture.detectChanges();

      expect(component.shouldShowError).toBeTrue();
    });

    it('should not show error when form control is valid', () => {
      const control = new FormControl('valid value');
      fixture.componentRef.setInput('control', control);
      fixture.detectChanges();

      expect(component.shouldShowError).toBeFalse();
    });
  });

  describe('Component Lifecycle', () => {
    it('should handle options changes', () => {
      fixture.componentRef.setInput('options', mockStringOptions);
      fixture.detectChanges();

      const initialValue = component.control()?.value;

      fixture.componentRef.setInput('options', [
        'New Option 1',
        'New Option 2',
      ]);
      fixture.detectChanges();

      // Should reset control value with new options
      expect(component.parsedOptions()).toHaveSize(2);
    });

    it('should initialize with provided value', () => {
      fixture.componentRef.setInput('options', mockStringOptions);
      fixture.componentRef.setInput('value', 'Option 2');
      fixture.detectChanges();

      expect(component.getValidInitialValues()).toBe('Option 2');
    });
  });
});
