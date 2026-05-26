import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTableLiteComponent } from './bmb-table-lite.component';

describe('BmbTableLiteComponent', () => {
  let component: BmbTableLiteComponent;
  let fixture: ComponentFixture<BmbTableLiteComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbTableLiteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
