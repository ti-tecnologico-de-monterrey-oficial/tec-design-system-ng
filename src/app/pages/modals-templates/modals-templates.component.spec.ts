import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsTemplatesComponent } from './modals-templates.component';

describe('ModalsTemplatesComponent', () => {
  let component: ModalsTemplatesComponent;
  let fixture: ComponentFixture<ModalsTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalsTemplatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalsTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
