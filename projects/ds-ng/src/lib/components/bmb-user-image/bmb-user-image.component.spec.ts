import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BmbUserImageComponent } from './bmb-user-image.component';

describe('BmbUserImageComponent', () => {
  let component: BmbUserImageComponent;
  let fixture: ComponentFixture<BmbUserImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmbUserImageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbUserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
