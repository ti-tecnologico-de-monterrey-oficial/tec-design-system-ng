import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbSearchCardItemComponent } from './bmb-search-card-item.component';

describe('BmbSearchCardItemComponent', () => {
  let component: BmbSearchCardItemComponent;
  let fixture: ComponentFixture<BmbSearchCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSearchCardItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmbSearchCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
