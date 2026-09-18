import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickOutsideDirective } from './clickoutside.directive';

@Component({
  template: `
    <div id="container" clickOutside (clickOutside)="onClickOutside()">
      <span id="inside">Inside</span>
    </div>
    <span id="outside">Outside</span>
    <span id="persisted" class="modal-persist">Persisted</span>
  `,
  imports: [ClickOutsideDirective],
})
class TestHostComponent {
  clickOutsideCount = 0;

  onClickOutside(): void {
    this.clickOutsideCount++;
  }
}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let directive: ClickOutsideDirective;
  let container: HTMLElement;
  let inside: HTMLElement;
  let outside: HTMLElement;
  let persisted: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    directive = fixture.debugElement
      .query(By.directive(ClickOutsideDirective))
      .injector.get(ClickOutsideDirective);

    container = fixture.nativeElement.querySelector('#container');
    inside = fixture.nativeElement.querySelector('#inside');
    outside = fixture.nativeElement.querySelector('#outside');
    persisted = fixture.nativeElement.querySelector('#persisted');
    document.body.appendChild(fixture.nativeElement);
  });

  afterEach(() => {
    fixture.nativeElement.remove();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('isInside', () => {
    it('should be true for the host element itself', () => {
      expect(directive.isInside(container)).toBe(true);
    });

    it('should be true for an element contained within the host', () => {
      expect(directive.isInside(inside)).toBe(true);
    });

    it('should be true for an element carrying the modal-persist class', () => {
      expect(directive.isInside(persisted)).toBe(true);
    });

    it('should be false for an unrelated outside element', () => {
      expect(directive.isInside(outside)).toBe(false);
    });
  });

  describe('clickOutside output', () => {
    it('should emit when clicking outside the host', () => {
      outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(host.clickOutsideCount).toBe(1);
    });

    it('should not emit when clicking inside the host', () => {
      inside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(host.clickOutsideCount).toBe(0);
    });

    it('should not emit anymore after the directive is destroyed', () => {
      fixture.destroy();

      outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(host.clickOutsideCount).toBe(0);
    });
  });
});
