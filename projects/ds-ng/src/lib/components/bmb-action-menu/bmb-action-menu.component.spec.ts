import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef, TemplateRef } from '@angular/core';
import { BmbActionMenuComponent } from './bmb-action-menu.component';

describe('BmbActionMenuComponent', () => {
  let component: BmbActionMenuComponent;
  let fixture: ComponentFixture<BmbActionMenuComponent>;
  let componentRef: ComponentRef<BmbActionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbActionMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbActionMenuComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('title', 'Test title');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title input correctly', () => {
    expect(componentRef.instance.title()).toBe('Test title');
  });

  it('should have default values for optional inputs', () => {
    expect(componentRef.instance.icon()).toBe('');
    expect(componentRef.instance.iconSize()).toBe(24);
    expect(componentRef.instance.showHeader()).toBe(true);
    expect(componentRef.instance.isAList()).toBe(true);
  });

  it('should update projectedContent after content initialization', () => {
    const mockTemplateRef = jasmine.createSpyObj<TemplateRef<any>>(
      'TemplateRef',
      ['elementRef'],
    );
    component.contentTemplates.reset([mockTemplateRef]);
    component.ngAfterContentInit();
    expect(component.projectedContent).toEqual([mockTemplateRef]);
  });

  it('should handle ContentChildren correctly', () => {
    const mockTemplateRef1 = jasmine.createSpyObj<TemplateRef<any>>(
      'TemplateRef1',
      ['elementRef'],
    );
    const mockTemplateRef2 = jasmine.createSpyObj<TemplateRef<any>>(
      'TemplateRef2',
      ['elementRef'],
    );
    component.contentTemplates.reset([mockTemplateRef1, mockTemplateRef2]);
    component.ngAfterContentInit();
    expect(component.projectedContent.length).toBe(2);
    expect(component.projectedContent).toContain(mockTemplateRef1);
    expect(component.projectedContent).toContain(mockTemplateRef2);
  });
});
