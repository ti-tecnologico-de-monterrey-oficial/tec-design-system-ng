import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTopBarUserSectionComponent } from './bmb-top-bar-user-section.component';

describe('BmbTopBarUserSectionComponent', () => {
  let component: BmbTopBarUserSectionComponent;
  let fixture: ComponentFixture<BmbTopBarUserSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTopBarUserSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTopBarUserSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
