import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbListGroupComponent } from './bmb-list-group.component';

describe('BmbListGroupComponent', () => {
  let component: BmbListGroupComponent;
  let fixture: ComponentFixture<BmbListGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbListGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
