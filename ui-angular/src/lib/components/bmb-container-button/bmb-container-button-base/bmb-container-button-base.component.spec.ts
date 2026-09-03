import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbContainerButtonBaseComponent } from './bmb-container-button-base.component';

describe('BmbContainerButtonBaseComponent', () => {
  let component: BmbContainerButtonBaseComponent;
  let fixture: ComponentFixture<BmbContainerButtonBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbContainerButtonBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbContainerButtonBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
