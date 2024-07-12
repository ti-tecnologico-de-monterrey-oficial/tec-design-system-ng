import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTimestreamDetailsComponent } from './bmb-timestream-detail.component';

describe('BmbTimestreamTimelineEventsComponent', () => {
  let component: BmbTimestreamDetailsComponent;
  let fixture: ComponentFixture<BmbTimestreamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTimestreamDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTimestreamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
