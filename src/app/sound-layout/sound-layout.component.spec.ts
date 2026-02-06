import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundLayoutComponent } from './sound-layout.component';

describe('SoundLayoutComponent', () => {
  let component: SoundLayoutComponent;
  let fixture: ComponentFixture<SoundLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoundLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoundLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
