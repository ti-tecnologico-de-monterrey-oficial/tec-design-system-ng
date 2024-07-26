import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbHomeCardHeaderComponent } from './bmb-home-card-header.component';

describe('BmbHomeCardHeaderComponent', () => {
  let component: BmbHomeCardHeaderComponent;
  let fixture: ComponentFixture<BmbHomeCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHomeCardHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHomeCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
