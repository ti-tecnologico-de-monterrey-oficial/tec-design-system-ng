import { Component, ComponentRef, TemplateRef, ViewChild } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TemplateMessageComponent } from './bmb-template-message.component';
import { BmbTemplateMessage } from '../../types';

let componentRef: ComponentRef<TemplateMessageComponent>;

@Component({
  standalone: true,
  template: `
    <ng-template #customTemplate>
      <div class="custom-template-content">Custom Template Content</div>
    </ng-template>
  `,
})
class TestHostComponent {
  @ViewChild('customTemplate', { static: true })
  customTemplate!: TemplateRef<unknown>;
}

describe('TemplateMessageComponent', () => {
  let component: TemplateMessageComponent;
  let fixture: ComponentFixture<TemplateMessageComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateMessageComponent, TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    fixture = TestBed.createComponent(TemplateMessageComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    const mockMessage: BmbTemplateMessage = {
      id: '1',
      type: 'template',
      isUser: false,
      timestamp: new Date(),
      content: {
        template: hostFixture.componentInstance.customTemplate,
      },
    };

    componentRef.setInput('message', mockMessage);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render template content', () => {
    const templateContent = fixture.debugElement.query(
      By.css('.custom-template-content'),
    );

    expect(templateContent).toBeTruthy();
  });

  it('should render correct template text', () => {
    const templateContent: HTMLElement = fixture.debugElement.query(
      By.css('.custom-template-content'),
    ).nativeElement;

    expect(templateContent.textContent?.trim()).toBe('Custom Template Content');
  });

  it('should have correct message input', () => {
    expect(component.message().type).toBe('template');
  });

  it('should render ng-template outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.innerHTML).toContain('Custom Template Content');
  });
});
