import { BmbButtonDirective } from './button.directive';
import {
  ElementRef,
  ViewContainerRef,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';

describe('ButtonDirective', () => {
  it('should create an instance', () => {
    // Simula instancias de los servicios que se esperan como argumentos en el constructor
    const elMock = {} as ElementRef<any>;
    const viewContainerRefMock = {} as ViewContainerRef;
    const cdrMock = {} as ChangeDetectorRef;
    const rendererMock = {} as Renderer2;

    // Crea una nueva instancia de la directiva proporcionando los argumentos simulados
    const directive = new BmbButtonDirective(
      elMock,
      viewContainerRefMock,
      cdrMock,
      rendererMock
    );

    // Verifica que la instancia se haya creado correctamente
    expect(directive).toBeTruthy();
  });
});
