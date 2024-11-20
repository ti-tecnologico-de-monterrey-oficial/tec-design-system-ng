import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbHomeMitecComponent } from './bmb-home-mitec.component';

describe('BmbHomeMitecComponent', () => {
  let component: BmbHomeMitecComponent;
  let fixture: ComponentFixture<BmbHomeMitecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHomeMitecComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbHomeMitecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
