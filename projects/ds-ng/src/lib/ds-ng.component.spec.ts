import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsNgComponent } from './ds-ng.component';

describe('DsNgComponent', () => {
  let component: DsNgComponent;
  let fixture: ComponentFixture<DsNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(DsNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
