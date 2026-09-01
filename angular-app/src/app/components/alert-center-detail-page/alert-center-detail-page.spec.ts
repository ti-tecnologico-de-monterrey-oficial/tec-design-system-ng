import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertCenterDetailPage } from './alert-center-detail-page';

describe('AlertCenterDetailPage', () => {
  let component: AlertCenterDetailPage;
  let fixture: ComponentFixture<AlertCenterDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertCenterDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertCenterDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the alert structure', () => {
    expect(component.alert().title).toBe('Alert title');
    expect(component.alert().description.length).toBeGreaterThan(0);
    expect(component.alert().description[2].type).toBe('link');
  });
});
