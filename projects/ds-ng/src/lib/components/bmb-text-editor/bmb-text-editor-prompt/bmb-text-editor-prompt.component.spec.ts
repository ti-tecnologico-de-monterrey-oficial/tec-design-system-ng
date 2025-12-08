import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbTextEditorPromptComponent } from './bmb-text-editor-prompt.component';

describe('BmbTextEditorPromptComponent', () => {
  let component: BmbTextEditorPromptComponent;
  let fixture: ComponentFixture<BmbTextEditorPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTextEditorPromptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmbTextEditorPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
