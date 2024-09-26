import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbPaginatorComponent } from './bmb-paginator.component';

describe('BmbPaginatorComponent', () => {
  let component: BmbPaginatorComponent;
  let fixture: ComponentFixture<BmbPaginatorComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
