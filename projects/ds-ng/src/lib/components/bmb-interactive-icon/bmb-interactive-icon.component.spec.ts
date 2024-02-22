import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BmbInteractiveIconComponent } from './bmb-interactive-icon.component';
import { Component, DebugElement } from '@angular/core';

@Component({
  selector: 'test-host-component',
  template: `
    <bmb-interactive-icon
      [appearance]="appearance"
      [text]="text"
      [icon]="icon"
      [image]="image"
      [grouped]="grouped"
    ></bmb-interactive-icon>
  `,
})
class TestHostComponent {
  appearance: string = '';
  text: string = '';
  icon: string = '';
  image: string = '';
  grouped: boolean = false;
}

describe('BmbInteractiveIconComponent', () => {
  let testHostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: BmbInteractiveIconComponent;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BmbInteractiveIconComponent, TestHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.appearance).toEqual('');
    expect(component.text).toEqual('');
    expect(component.icon).toEqual('');
    expect(component.image).toEqual('');
    expect(component.grouped).toEqual(false);
  });

  it('should apply appearance class', () => {
    testHostComponent.appearance = 'custom';
    fixture.detectChanges();

    const interactiveIconElement =
      debugElement.nativeElement.querySelector('.interactive__icon');
    expect(
      interactiveIconElement.classList.contains('interactive__icon--custom')
    ).toBe(true);
  });
});
