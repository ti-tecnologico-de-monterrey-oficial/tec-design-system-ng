import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LinkMessageComponent } from './bmb-link-message.component';
import { BmbLinkMessage } from '../../types';

let componentRef: ComponentRef<LinkMessageComponent>;

describe('LinkMessageComponent', () => {
  let component: LinkMessageComponent;
  let fixture: ComponentFixture<LinkMessageComponent>;

  const mockMessage: BmbLinkMessage = {
    id: '1',
    type: 'link',
    isUser: false,
    timestamp: new Date(),
    content: {
      text: 'Open Google',
      href: 'https://google.com',
      target: '_blank',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkMessageComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('message', mockMessage);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct message input', () => {
    expect(component.message()).toEqual(mockMessage);
  });

  it('should render text link component', () => {
    const element = fixture.debugElement.query(By.css('bmb-text-link'));

    expect(element).toBeTruthy();
  });

  it('should pass correct textLink input', () => {
    const element = fixture.debugElement.query(By.css('bmb-text-link'));

    expect(element.componentInstance.textLink).toBe(mockMessage.content.text!);
  });

  it('should pass correct link input', () => {
    const element = fixture.debugElement.query(By.css('bmb-text-link'));

    expect(element.componentInstance.link).toBe(mockMessage.content.href!);
  });

  it('should pass correct target input', () => {
    const element = fixture.debugElement.query(By.css('bmb-text-link'));

    expect(element.componentInstance.target).toBe(mockMessage.content.target);
  });

  it('should use underlined style', () => {
    const element = fixture.debugElement.query(By.css('bmb-text-link'));

    expect(element.componentInstance.textLinkStyle).toBe('underlined');
  });

  it('should set disabled as false', () => {
    const element = fixture.debugElement.query(By.css('bmb-text-link'));

    expect(element.componentInstance.disabled).toBeFalse();
  });

  it('should fallback target to _blank', () => {
    const messageWithoutTarget: BmbLinkMessage = {
      ...mockMessage,
      content: {
        text: 'Open Google',
        href: 'https://google.com',
      },
    };

    componentRef.setInput('message', messageWithoutTarget);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('bmb-text-link'));

    expect(element.componentInstance.target).toBe('_blank');
  });
});
