import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbServerTableComponent } from './bmb-server-table.component';

describe('BmbServerTableComponent', () => {
  let component: BmbServerTableComponent;
  let fixture: ComponentFixture<BmbServerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbServerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmbServerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
