import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from './projection.service';

import { TestBed } from '@angular/core/testing';
import { RendererFactory2, Renderer2 } from '@angular/core';

describe('BmbProjectionContentService', () => {
  let service: BmbProjectionContentService;
  let mockRenderer: Renderer2;
  let mockRendererFactory2: RendererFactory2;
  let mockAppRef: any;

  beforeEach(() => {
    mockRenderer = {
      setAttribute: () => {},
      removeAttribute: () => {},
      appendChild: () => {},
      removeChild: () => {},
      destroy: () => {},
      createElement: (tag: string) => document.createElement(tag),
      createComment: (text: string) => document.createComment(text),
      listen: () => () => {}, // Mock listen method
      // Add other methods as needed
    } as any;

    mockRendererFactory2 = {
      createRenderer: () => mockRenderer,
    } as any;

    mockAppRef = {
      attachView: () => {},
    } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: RendererFactory2, useValue: mockRendererFactory2 },
        // Remove AppRef provider if not available
        BmbProjectionContentService,
      ],
    });

    service = TestBed.inject(BmbProjectionContentService);
    service.closeContent(); // Reset state before each test
  });

  it('debe inicializar con contenido proyectado nulo', () => {
    expect(service.getProjectedContent()).toBeNull();
    expect(service.isThereContentProjected()).toBe(false);
  });

  it('debe abrir contenido proyectado', () => {
    const content: IBmbProjectionContent = {
      content: null,
      mode: 'over',
      inputContext: { test: 'valor' },
      showBackdrop: true,
    };

    service.openContent(content);

    const projected = service.getProjectedContent();

    expect(projected).toEqual(jasmine.objectContaining(content));
    expect(projected?.id).toBeDefined();
    expect(service.isThereContentProjected()).toBe(true);
  });

  it('debe cerrar el contenido proyectado', () => {
    const content: IBmbProjectionContent = { content: null };
    service.openContent(content);
    expect(service.isThereContentProjected()).toBe(true);
    service.closeContent();
    expect(service.getProjectedContent()).toBeNull();
    expect(service.isThereContentProjected()).toBe(false);
  });

  it('debe sobrescribir el contenido proyectado si se abre uno nuevo', () => {
    const content1: IBmbProjectionContent = { content: null, mode: 'over' };
    const content2: IBmbProjectionContent = { content: null, mode: 'partial' };

    service.openContent(content2);
    service.openContent(content1);
    const firstId = service.getProjectedContent()?.id;

    service.openContent(content2);
    const secondId = service.getProjectedContent()?.id;

    expect(firstId).not.toEqual(secondId);
  });
});
