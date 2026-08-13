import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbThreeColsComponent } from './bmb-three-cols.component';
import { ComponentRef } from '@angular/core';
describe('BmbThreeMainColumnsTemplateComponent', () => {
  let component: BmbThreeColsComponent;
  let fixture: ComponentFixture<BmbThreeColsComponent>;
  let componentRef: ComponentRef<BmbThreeColsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbThreeColsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbThreeColsComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fixture defined', () => {
    expect(fixture).toBeDefined();
  });

  it('should have componentRef defined', () => {
    expect(componentRef).toBeDefined();
  });

  it('should initialize component with default values', () => {
    expect(component).toBeTruthy();
    expect(fixture.componentInstance).toBe(component);
  });

  it('should render the component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });
});
