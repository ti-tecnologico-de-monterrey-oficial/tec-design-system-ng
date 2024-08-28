import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbWebTemplatesComponent } from './bmb-web-templates.component';

describe('BmbWebTemplatesComponent', () => {
  let component: BmbWebTemplatesComponent;
  let fixture: ComponentFixture<BmbWebTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbWebTemplatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbWebTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
