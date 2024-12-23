import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbProfileComponent } from './bmb-profile.component';

describe('BmbProfileComponent', () => {
  let component: BmbProfileComponent;
  let fixture: ComponentFixture<BmbProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmbProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
