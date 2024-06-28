import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTabStudenActivityComponent } from './bmb-student-activity-tab.component';

describe('BmbTabStudenActivityComponent', () => {
  let component: BmbTabStudenActivityComponent;
  let fixture: ComponentFixture<BmbTabStudenActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTabStudenActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTabStudenActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
