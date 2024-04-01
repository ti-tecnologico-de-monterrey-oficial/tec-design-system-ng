import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbThemeComponent } from './bmb-theme.component';

describe('BmbThemeComponent', () => {
  let component: BmbThemeComponent;
  let fixture: ComponentFixture<BmbThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbThemeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbThemeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
