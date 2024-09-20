import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbBottomNavigationBarComponent } from './bmb-bottom-navigation-bar.component';

describe('BmbBottomNavigationBarComponent', () => {
  let component: BmbBottomNavigationBarComponent;
  let fixture: ComponentFixture<BmbBottomNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbBottomNavigationBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbBottomNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
