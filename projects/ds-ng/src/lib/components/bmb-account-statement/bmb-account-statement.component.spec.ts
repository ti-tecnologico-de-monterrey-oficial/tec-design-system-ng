import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbAccountStatementComponent } from './bmb-account-statement.component';

describe('BmbAccountStatementComponent', () => {
  let component: BmbAccountStatementComponent;
  let fixture: ComponentFixture<BmbAccountStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAccountStatementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
