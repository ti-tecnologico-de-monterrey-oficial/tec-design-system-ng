import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbHitoListComponent } from './bmb-hito-list.component';

describe('BmbHitoListComponent', () => {
  let component: BmbHitoListComponent;
  let fixture: ComponentFixture<BmbHitoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHitoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHitoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
