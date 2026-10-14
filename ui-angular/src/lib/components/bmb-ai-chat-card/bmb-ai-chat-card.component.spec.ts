import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAIChatCardComponent } from './bmb-ai-chat-card.component';
import { ComponentRef } from '@angular/core';

describe('BmbAIChatCardComponent', () => {
  let component: BmbAIChatCardComponent;
  let fixture: ComponentFixture<BmbAIChatCardComponent>;
  let componentRef: ComponentRef<BmbAIChatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAIChatCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAIChatCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to chat when contracting from compact or invisible', () => {
    component.mode.set('compact');
    (component as unknown as { handleExpandOrContract: () => void })
      .handleExpandOrContract();
    expect(component.mode()).toBe('chat');

    component.mode.set('invisible');
    (component as unknown as { handleExpandOrContract: () => void })
      .handleExpandOrContract();
    expect(component.mode()).toBe('chat');
  });

  it('should go to compact when contracting from chat and the last non-chat mode was not invisible', () => {
    component.mode.set('chat');
    (component as unknown as { handleExpandOrContract: () => void })
      .handleExpandOrContract();
    expect(component.mode()).toBe('compact');
  });

  it('should go back to invisible when contracting from chat after tracking invisible as the last non-chat mode', () => {
    component.mode.set('invisible');
    fixture.detectChanges();

    component.mode.set('chat');
    (component as unknown as { handleExpandOrContract: () => void })
      .handleExpandOrContract();

    expect(component.mode()).toBe('invisible');
  });

  it('should go to chat when expanding', () => {
    component.mode.set('expanded');
    (component as unknown as { handleExpandOrContract: () => void })
      .handleExpandOrContract();
    expect(component.mode()).toBe('chat');
  });
});
