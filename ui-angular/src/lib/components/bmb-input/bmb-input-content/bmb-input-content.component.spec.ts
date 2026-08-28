import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbInputContentComponent } from './bmb-input-content.component';

describe('BmbInputContentComponent', () => {
  let component: BmbInputContentComponent;
  let fixture: ComponentFixture<BmbInputContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbInputContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbInputContentComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'test-input');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
