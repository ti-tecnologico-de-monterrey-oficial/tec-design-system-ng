import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbSimpleHeaderComponent } from './bmb-simple-header.component';

describe('BmbSimpleHeaderComponent', () => {
  let component: BmbSimpleHeaderComponent;
  let fixture: ComponentFixture<BmbSimpleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSimpleHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSimpleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
