import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbDotPaginatorComponent } from './bmb-dot-paginator.component';

describe('BmbDotPaginatorComponent', () => {
  let component: BmbDotPaginatorComponent;
  let fixture: ComponentFixture<BmbDotPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmbDotPaginatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbDotPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
