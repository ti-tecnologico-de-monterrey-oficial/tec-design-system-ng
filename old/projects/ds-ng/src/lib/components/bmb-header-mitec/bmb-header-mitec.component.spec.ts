import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbHeaderMitecComponent } from './bmb-header-mitec.component';

describe('BmbHeaderMitecComponent', () => {
  let component: BmbHeaderMitecComponent;
  let fixture: ComponentFixture<BmbHeaderMitecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHeaderMitecComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHeaderMitecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
