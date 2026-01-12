import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BmbSearchInputComponent } from './bmb-search-input.component';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IDropdownItem } from '../../types';

describe('BmbSearchInputComponent', () => {
  let component: BmbSearchInputComponent;
  let fixture: ComponentFixture<BmbSearchInputComponent>;
  let componentRef: ComponentRef<BmbSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSearchInputComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.value).toBe('');
    expect(component.filteredData).toEqual([]);
    expect(component.isDialogOpen).toBeFalse();
  });

  it('should update items and filteredData when data input changes', () => {
    const testData = ['Apple', 'Banana', 'Cherry'];
    componentRef.setInput('data', testData);
    fixture.detectChanges();
    component.ngOnChanges({
      data: {
        currentValue: testData,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.items.length).toBe(3);
    expect(component.filteredData.length).toBe(3);
    expect(component.items[0].text).toBe('Apple');
  });

  it('should update items when serverSideFilteredData changes and isServerSideFilter is true', () => {
    const testData = ['Dog', 'Cat'];
    componentRef.setInput('isServerSideFilter', true);
    componentRef.setInput('serverSideFilteredData', testData);
    fixture.detectChanges();

    component.ngOnChanges({
      serverSideFilteredData: {
        currentValue: testData,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.items.length).toBe(2);
    expect(component.items[0].text).toBe('Dog');
  });

  it('should disable filterControl when isLoading is true', () => {
    componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    component.ngOnChanges({
      isLoading: {
        currentValue: true,
        previousValue: false,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.filterControl.disabled).toBeTrue();
  });

  it('should filter data when typing in filterControl', fakeAsync(() => {
    const testData = ['Apple', 'Banana', 'Cherry'];
    componentRef.setInput('data', testData);
    fixture.detectChanges();
    component.ngOnChanges({
      data: {
        currentValue: testData,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    component.filterControl.setValue('App');
    tick(300); // Wait for debounceTime
    fixture.detectChanges();

    expect(component.filteredData.length).toBe(1);
    expect(component.filteredData[0].text).toBe('Apple');
  }));

  it('should emit onValueChange when an item is selected (client-side)', () => {
    spyOn(component.onValueChange, 'emit');
    const item: IDropdownItem = { text: 'Apple', value: 'Apple', icon: '' };
    componentRef.setInput('isServerSideFilter', false);

    component.setSelectedValue(item);

    expect(component.filterControl.value).toBe('Apple');
    expect(component.onValueChange.emit).toHaveBeenCalledWith('Apple');
  });

  it('should emit onServerSideFilterEvent when an item is selected (server-side)', () => {
    spyOn(component.onServerSideFilterEvent, 'emit');
    const item: IDropdownItem = { text: 'Apple', value: 'Apple', icon: '' };
    componentRef.setInput('isServerSideFilter', true);

    component.setSelectedValue(item);

    expect(component.filterControl.value).toBe('Apple');
    expect(component.onServerSideFilterEvent.emit).toHaveBeenCalledWith(
      'Apple',
    );
  });

  it('should close dialog when closeList is called', () => {
    component.isDialogOpen = true;
    component.closeList();
    expect(component.isDialogOpen).toBeFalse();
  });

  it('should toggle dialog when handleItemClick is called', () => {
    component.isDialogOpen = false;
    component.handleItemClick();
    expect(component.isDialogOpen).toBeTrue();

    component.handleItemClick();
    expect(component.isDialogOpen).toBeFalse();
  });

  it('should emit onClearField when handleClearFilter is called', () => {
    spyOn(component.onClearField, 'emit');
    component.handleClearFilter();
    expect(component.onClearField.emit).toHaveBeenCalledWith(true);
  });

  it('should open dialog on ArrowDown key', () => {
    component.isDialogOpen = false;
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    component.handleKeyDown(event);
    expect(component.isDialogOpen).toBeTrue();
  });

  it('should select first option on Enter key if value exists', () => {
    const testData = ['Apple', 'Banana'];
    componentRef.setInput('data', testData);
    fixture.detectChanges();
    component.ngOnChanges({
      data: {
        currentValue: testData,
        previousValue: [],
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    spyOn(component, 'setSelectedValue');
    component.filterControl.setValue('App');

    // Mock filteredData since it's updated in debounceTime which we are skipping here or we can use fakeAsync
    component.filteredData = [{ text: 'Apple', value: 'Apple', icon: '' }];

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event, 'preventDefault');

    component.handleKeyDown(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.setSelectedValue).toHaveBeenCalledWith(
      component.filteredData[0],
    );
  });
});
