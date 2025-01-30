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

  it('should render content in left, main, and right columns', () => {
    const leftContent = fixture.nativeElement.querySelector('span:first-child');
    const mainContent =
      fixture.nativeElement.querySelector('span:nth-child(2)');
    const rightContent = fixture.nativeElement.querySelector('span:last-child');

    expect(leftContent).toBeTruthy();
    expect(mainContent).toBeTruthy();
    expect(rightContent).toBeTruthy();
  });
});
