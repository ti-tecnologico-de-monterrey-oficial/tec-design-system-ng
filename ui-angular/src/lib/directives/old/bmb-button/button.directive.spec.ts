import { TestBed } from '@angular/core/testing';
import { BmbButtonDirective } from './button.directive';
import {
  ElementRef,
  ViewContainerRef,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';

describe('ButtonDirective', () => {
  it('should create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const elMock = {} as ElementRef<any>;
      const viewContainerRefMock = {} as ViewContainerRef;
      const cdrMock = {} as ChangeDetectorRef;
      const rendererMock = {} as Renderer2;

      const directive = new BmbButtonDirective(
        elMock,
        viewContainerRefMock,
        cdrMock,
        rendererMock,
      );

      expect(directive).toBeTruthy();
    });
  });
});
