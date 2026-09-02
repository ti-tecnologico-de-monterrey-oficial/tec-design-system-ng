import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertCenterBoxIconPage } from './alert-center-box-icon-page';

describe('AlertCenterBoxIconPage', () => {
  let component: AlertCenterBoxIconPage;
  let fixture: ComponentFixture<AlertCenterBoxIconPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertCenterBoxIconPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertCenterBoxIconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize defaults', () => {
    expect(component.iconName()).toBe('home');
    expect(component.boxColor()).toBe('semantic-success');
    expect(component.title()).toBe('Alert title');
    expect(component.linkHref()).toBe('https://tec.mx');
  });
});
