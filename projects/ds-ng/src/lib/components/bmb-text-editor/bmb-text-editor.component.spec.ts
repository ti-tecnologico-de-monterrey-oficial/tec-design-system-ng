import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTextEditorComponent } from './bmb-text-editor.component';

describe('BmbTextEditorComponent', () => {
  let component: BmbTextEditorComponent;
  let fixture: ComponentFixture<BmbTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTextEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
