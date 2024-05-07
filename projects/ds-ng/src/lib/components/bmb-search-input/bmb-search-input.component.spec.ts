import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbSearchInputComponent } from './bmb-search-input.component';

describe('BmbSearchInputComponent', () => {
  let component: BmbSearchInputComponent;
  let fixture: ComponentFixture<BmbSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
