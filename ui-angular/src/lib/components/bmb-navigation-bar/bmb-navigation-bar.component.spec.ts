import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbNavigationBarComponent } from './bmb-navigation-bar.component';

describe('BmbButtonNavigationComponent', () => {
  let component: BmbNavigationBarComponent;
  let fixture: ComponentFixture<BmbNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbNavigationBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
