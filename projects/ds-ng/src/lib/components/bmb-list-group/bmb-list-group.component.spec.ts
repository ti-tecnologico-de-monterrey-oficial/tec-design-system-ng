import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbListGroupComponent } from './bmb-list-group.component';
import { BmbListGroupItemComponent } from './bmb-list-group.component';
import { BmbListGroupStatusService } from './bmb-list-group.service';
import { ComponentRef } from '@angular/core';

describe('BmbListGroupComponent', () => {
  let component: BmbListGroupComponent;
  let fixture: ComponentFixture<BmbListGroupComponent>;
  let bmbListGroupStatusService: BmbListGroupStatusService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbListGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbListGroupComponent);
    component = fixture.componentInstance;
    bmbListGroupStatusService = TestBed.inject(BmbListGroupStatusService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct variable styles', () => {
    expect(component.getVarStyles('m')).toBe('var(--bmb-spacing-m)');
    expect(component.getVarStyles(['m', 'l'])).toBe(
      'var(--bmb-spacing-m) var(--bmb-spacing-l)',
    );
  });

  it('should return correct class names', () => {
    spyOn(component, 'showControls').and.returnValue(false);
    expect(component.getClassNames()).toEqual([
      'bmb_list-group',
      'bmb_list-group-rounded',
      'bmb_list-group-no-controls',
    ]);
  });

  it('should return correct styles', () => {
    spyOn(component, 'getVarStyles').and.callThrough();
    const styles = component.getStyles();
    expect(styles).toEqual({
      '--bmb-list-group-item-radius': 'var(--bmb-spacing-m)',
      '--bmb-list-group-item-padding': 'var(--bmb-spacing-m)',
      gap: 'var(--bmb-spacing-m)',
    });
  });
});

describe('BmbListGroupItemComponent', () => {
  let component: BmbListGroupItemComponent;
  let fixture: ComponentFixture<BmbListGroupItemComponent>;
  let bmbListGroupStatusService: BmbListGroupStatusService;
  let componentRef: ComponentRef<BmbListGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbListGroupItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbListGroupItemComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('id', 'test-id');
    bmbListGroupStatusService = TestBed.inject(BmbListGroupStatusService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update list group status on init if active', () => {
    componentRef.setInput('isActive', true);

    spyOn(bmbListGroupStatusService, 'updateListGroupStatus');
    component.ngOnInit();
    expect(
      bmbListGroupStatusService.updateListGroupStatus,
    ).toHaveBeenCalledWith('test-id');
  });

  it('should not update list group status on init if not active', () => {
    componentRef.setInput('isActive', false);
    spyOn(bmbListGroupStatusService, 'updateListGroupStatus');
    component.ngOnInit();
    expect(
      bmbListGroupStatusService.updateListGroupStatus,
    ).not.toHaveBeenCalled();
  });

  it('should return correct class names', () => {
    spyOn(bmbListGroupStatusService, 'getListGroupStatus').and.returnValue([
      'test-id',
    ]);
    componentRef.setInput('isDisabled', true);
    const classNames = component.getClasses();
    expect(classNames).toContain('bmb_list-group-item');
    expect(classNames).toContain('bmb_list-group-item-selected');
    expect(classNames).toContain('bmb_list-group-item-disabled');
  });

  it('should return correct configuration', () => {
    const config = { isMultipleSelection: true, showControls: true };
    spyOn(
      bmbListGroupStatusService,
      'getListGroupConfiguration',
    ).and.returnValue(config);
    expect(component.getConfig()).toEqual(config);
  });

  it('should return correct selection length', () => {
    spyOn(bmbListGroupStatusService, 'getListGroupStatus').and.returnValue([
      'test-id',
    ]);
    expect(component.getSelectionLength()).toBe(1);
  });

  it('should show controls', () => {
    const config = { isMultipleSelection: true, showControls: true };
    spyOn(
      bmbListGroupStatusService,
      'getListGroupConfiguration',
    ).and.returnValue(config);
    expect(component.showControls()).toBeTrue();
  });
});
