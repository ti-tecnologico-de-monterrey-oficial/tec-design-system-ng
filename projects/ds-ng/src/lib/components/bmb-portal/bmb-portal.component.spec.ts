import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbPortalComponent } from './bmb-portal.component';

describe('BmbPortalComponent', () => {
  let component: BmbPortalComponent;
  let fixture: ComponentFixture<BmbPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbPortalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
