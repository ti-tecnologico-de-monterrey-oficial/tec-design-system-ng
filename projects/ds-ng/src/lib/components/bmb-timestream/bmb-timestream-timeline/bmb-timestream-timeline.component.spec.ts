import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTimestreamTimelineComponent } from './bmb-timestream-timeline.component';

describe('BmbTimestreamTimelineComponent', () => {
  let component: BmbTimestreamTimelineComponent;
  let fixture: ComponentFixture<BmbTimestreamTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTimestreamTimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTimestreamTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
