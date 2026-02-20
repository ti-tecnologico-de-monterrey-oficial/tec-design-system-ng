import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbActionMenuComponent } from './bmb-action-menu.component';
import { Component } from '@angular/core';

@Component({
  template: `
    <bmb-action-menu componentTitle="Test title">
      <ng-template #tpl>Contenido</ng-template>
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
    componentRef.setInput('title', 'Test title');
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
    hostFixture.detectChanges();

    component = hostFixture.debugElement.children[0].componentInstance;
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
  });

  it('should update projectedContent after content initialization', () => {
    expect(component.projectedContent.length).toBe(1);
  });
});
