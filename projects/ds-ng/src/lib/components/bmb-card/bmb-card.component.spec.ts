import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCardComponent } from './bmb-card.component';

describe('BmbCardComponent', () => {
  let component: BmbCardComponent;
  let fixture: ComponentFixture<BmbCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.borderRadius).toBe('m');
    expect(component.margin).toBe('m');
    expect(component.type).toBe('normal');
    expect(component.state).toBe('normal');
    expect(component.alternative).toBe(false);
  });

  it('should return correct classes', () => {
    component.borderRadius = 'l';
    component.margin = 's';
    component.type = 'primary';
    fixture.detectChanges();

    const classes = component.getClasses();
    expect(classes).toContain('bmb_border-radius-l');
    expect(classes).toContain('bmb_margin-s');
    expect(classes).toContain('bmb_card-type-primary');
  });

  it('should return correct styles', () => {
    component.borderRadius = ['s', 'm'];
    component.margin = ['l', 'xl'];
    fixture.detectChanges();

    const styles = component.getStyles();
    expect(styles['border-radius']).toBe(
      'var(--bmb-radius-s) var(--bmb-radius-m)',
    );
    expect(styles.margin).toBe('var(--bmb-radius-l) var(--bmb-radius-xl)');
  });
});
