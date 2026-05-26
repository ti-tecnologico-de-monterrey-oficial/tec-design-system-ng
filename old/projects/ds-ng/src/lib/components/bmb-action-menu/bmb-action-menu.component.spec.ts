import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbActionMenuComponent } from './bmb-action-menu.component';
import { Component } from '@angular/core';

@Component({
  template: `
    <bmb-action-menu componentTitle="Test title">
      <ng-template #actionMenuItem>Content</ng-template>
    </bmb-action-menu>
  `,
})
class TestHostComponent {}

describe('BmbActionMenuComponent', () => {
  let component: BmbActionMenuComponent;
  let fixture: ComponentFixture<BmbActionMenuComponent>;
  let componentRef: ComponentRef<BmbActionMenuComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [BmbActionMenuComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    fixture = TestBed.createComponent(BmbActionMenuComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Test title');
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
    hostFixture.detectChanges();

    component = hostFixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title input correctly', () => {
    expect(componentRef.instance.componentTitle()).toBe('Test title');
  });

  it('should have default values for optional inputs', () => {
    expect(componentRef.instance.icon()).toBe('');
    expect(componentRef.instance.iconSize()).toBe(24);
    expect(componentRef.instance.showHeader()).toBe(true);
  });

  it('should update title when input changes', () => {
    componentRef.setInput('componentTitle', 'Updated title');
    fixture.detectChanges();
    expect(componentRef.instance.componentTitle()).toBe('Updated title');
  });

  it('should update icon when input changes', () => {
    componentRef.setInput('icon', 'star');
    fixture.detectChanges();
    expect(componentRef.instance.icon()).toBe('star');
  });

  it('should update iconSize when input changes', () => {
    componentRef.setInput('iconSize', 32);
    fixture.detectChanges();
    expect(componentRef.instance.iconSize()).toBe(32);
  });

  it('should update showHeader when input changes', () => {
    componentRef.setInput('showHeader', false);
    fixture.detectChanges();
    expect(componentRef.instance.showHeader()).toBe(false);
  });

  it('should render component in host component', () => {
    expect(hostComponent).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should have componentTitle attribute from host component', () => {
    expect(component.componentTitle()).toBe('Test title');
  });
});
