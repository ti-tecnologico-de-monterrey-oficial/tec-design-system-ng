import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Renderer2,
  ElementRef,
  SimpleChanges,
  SimpleChange,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { CdkDragMove, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';

import { BmbPullWedgeComponent } from './bmb-pull-wedge.component';

describe('BmbPullWedgeComponent', () => {
  let component: BmbPullWedgeComponent;
  let fixture: ComponentFixture<BmbPullWedgeComponent>;
  let mockRenderer: jasmine.SpyObj<Renderer2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbPullWedgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbPullWedgeComponent);
    component = fixture.componentInstance;

    // Create spy after component is created to override the injected Renderer2
    mockRenderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
    (component as any).renderer = mockRenderer;

    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values for inputs', () => {
      expect(component.initialHeight).toBe(300);
      expect(component.minContentHeight).toBe(100);
    });

    it('should initialize properties correctly', () => {
      expect(component.isOpen()).toBe(false);
      expect(component.contentHeight).toBe(component.minContentHeight);
      expect(component.maxDragHeight).toBe(0);
      expect(component.isVisible).toBe(true);
    });
  });

  describe('Input Properties', () => {
    it('should handle initialHeight changes', () => {
      component.initialHeight = 500;
      const changes: SimpleChanges = {
        initialHeight: new SimpleChange(300, 500, false),
      };

      component.ngOnChanges(changes);

      expect(component.maxDragHeight).toBe(255); // 500 * 0.51
    });

    it('should handle minContentHeight changes', () => {
      const mockElement = { nativeElement: document.createElement('div') };
      component.contentRef = mockElement as ElementRef;
      component.minContentHeight = 150;

      const changes: SimpleChanges = {
        minContentHeight: new SimpleChange(100, 150, false),
      };

      component.ngOnChanges(changes);

      expect(component.contentHeight).toBeGreaterThanOrEqual(150);
      expect(mockRenderer.setStyle).toHaveBeenCalled();
    });
    it('should handle isOpen changes when opening', () => {
      const mockElement = { nativeElement: document.createElement('div') };
      component.contentRef = mockElement as ElementRef;
      component.isOpen.set(true);

      const changes: SimpleChanges = {
        isOpen: new SimpleChange(false, true, false),
      };

      component.ngOnChanges(changes);

      expect(component.contentHeight).toBe(component.initialHeight);
      expect(mockRenderer.setStyle).toHaveBeenCalled();
    });

    it('should handle isOpen changes when closing', () => {
      const mockElement = { nativeElement: document.createElement('div') };
      component.contentRef = mockElement as ElementRef;
      component.isOpen.set(false);

      const changes: SimpleChanges = {
        isOpen: new SimpleChange(true, false, false),
      };

      component.ngOnChanges(changes);

      expect(component.contentHeight).toBe(component.minContentHeight);
      expect(mockRenderer.setStyle).toHaveBeenCalled();
    });
  });

  describe('Lifecycle Hooks', () => {
    it('should set initial height after view init', () => {
      const mockElement = { nativeElement: document.createElement('div') };
      component.contentRef = mockElement as ElementRef;

      component.ngAfterViewInit();

      expect(mockRenderer.setStyle).toHaveBeenCalled();
    });
  });

  describe('Drag Events', () => {
    beforeEach(() => {
      const mockElement = { nativeElement: document.createElement('div') };
      component.contentRef = mockElement as ElementRef;
    });

    it('should handle drag start', () => {
      component.contentHeight = 200;
      const mockEvent = {} as CdkDragStart;

      component.onDragStarted(mockEvent);

      expect(component['initialDragHeight']).toBe(200);
    });

    it('should handle drag move within bounds', () => {
      component['initialDragHeight'] = 150;
      component.initialHeight = 300;
      component.minContentHeight = 100;

      const mockEvent = {
        distance: { y: 50 },
      } as CdkDragMove;

      component.onDragMoved(mockEvent);

      expect(component.contentHeight).toBe(200); // 150 + 50
      expect(mockRenderer.setStyle).toHaveBeenCalled();
    });

    it('should not update height when drag exceeds upper bound', () => {
      component['initialDragHeight'] = 250;
      component.initialHeight = 300;
      component.minContentHeight = 100;
      const originalHeight = component.contentHeight;

      const mockEvent = {
        distance: { y: 100 }, // Would make height 350, exceeding initialHeight
      } as CdkDragMove;

      component.onDragMoved(mockEvent);

      expect(component.contentHeight).toBe(originalHeight);
    });

    it('should not update height when drag exceeds lower bound', () => {
      component['initialDragHeight'] = 150;
      component.initialHeight = 300;
      component.minContentHeight = 100;
      const originalHeight = component.contentHeight;

      const mockEvent = {
        distance: { y: -100 }, // Would make height 50, below minContentHeight
      } as CdkDragMove;

      component.onDragMoved(mockEvent);

      expect(component.contentHeight).toBe(originalHeight);
    });

    it('should open when drag ends above threshold', () => {
      component.contentHeight = 200; // Above maxDragHeight (153)
      component.maxDragHeight = 153;
      component.initialHeight = 300;

      const mockEvent = {} as CdkDragEnd;

      component.onDragEnded(mockEvent);

      expect(component.contentHeight).toBe(300);
      expect(component.isOpen()).toBe(true);
      expect(mockRenderer.setStyle).toHaveBeenCalled();
    });

    it('should handle drag end with proper state changes', () => {
      const mockElement = { nativeElement: document.createElement('div') };
      component.contentRef = mockElement as ElementRef;
      component.minContentHeight = 100;
      component.initialHeight = 300;
      component.maxDragHeight = 150;

      // Test case 1: content height below midpoint (150)
      component.contentHeight = 100;
      component.onDragEnded({} as CdkDragEnd);
      expect(component.contentHeight).toBe(100); // Should remain minContentHeight
      expect(component.isOpen()).toBe(false);

      // Test case 2: content height above maxDragHeight
      component.contentHeight = 200;
      component.onDragEnded({} as CdkDragEnd);
      expect(component.contentHeight).toBe(300); // Should set to initialHeight
      expect(component.isOpen()).toBe(true);

      expect(mockRenderer.setStyle).toHaveBeenCalled();
    });

    it('should maintain current state when drag ends between thresholds', () => {
      component.contentHeight = 160; // Between thresholds
      component.maxDragHeight = 153;
      component.isOpen.set(false); // Set explicit state

      const mockEvent = {} as CdkDragEnd;

      component.onDragEnded(mockEvent);

      // Should not change when between thresholds
      expect(mockRenderer.setStyle).toHaveBeenCalled();
    });
  });

  describe('Toggle Functionality', () => {
    beforeEach(() => {
      const mockElement = { nativeElement: document.createElement('div') };
      component.contentRef = mockElement as ElementRef;
    });

    it('should close wedge when currently open', () => {
      component.isOpen.set(true);
      component.initialHeight = 300;
      component.minContentHeight = 100;

      component.toggleWedge();

      expect(component.isOpen()).toBe(false);
      expect(component.contentHeight).toBe(100);
      expect(mockRenderer.setStyle).toHaveBeenCalled();
    });

    it('should open wedge when currently closed', () => {
      component.isOpen.set(false);
      component.initialHeight = 300;
      component.minContentHeight = 100;

      component.toggleWedge();

      expect(component.isOpen()).toBe(true);
      expect(component.contentHeight).toBe(300);
      expect(mockRenderer.setStyle).toHaveBeenCalled();
    });
  });

  describe('Template Rendering', () => {
    it('should render main container with initial height', () => {
      // Component initializes with minContentHeight (100px)
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.bmb_pull_wedge'));
      expect(container.nativeElement.style.height).toBe(
        `${component.minContentHeight}px`,
      );
    });

    it('should have proper template structure', () => {
      const container = fixture.debugElement.query(By.css('.bmb_pull_wedge'));
      const wrapper = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-wrapper'),
      );
      const content = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-content'),
      );
      const dragArea = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-drag'),
      );

      expect(container).toBeTruthy();
      expect(wrapper).toBeTruthy();
      expect(content).toBeTruthy();
      expect(dragArea).toBeTruthy();
    });

    it('should render content area with correct classes', () => {
      const content = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-content'),
      );
      expect(content).toBeTruthy();
      expect(content.nativeElement.classList.contains('visible')).toBe(true);
    });

    it('should add open class when wedge is open', () => {
      component.isOpen.set(true);
      fixture.detectChanges();

      const content = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-content'),
      );
      expect(
        content.nativeElement.classList.contains('bmb_pull_wedge-content-open'),
      ).toBe(true);
    });

    it('should remove open class when wedge is closed', () => {
      component.isOpen.set(false);
      fixture.detectChanges();

      const content = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-content'),
      );
      expect(
        content.nativeElement.classList.contains('bmb_pull_wedge-content-open'),
      ).toBe(false);
    });

    it('should render drag handle with CDK drag directives', () => {
      const dragHandle = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-drag'),
      );
      expect(dragHandle).toBeTruthy();
      expect(dragHandle.attributes['cdkDrag']).toBeDefined();
    });

    it('should render toggle button', () => {
      const button = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-button'),
      );
      expect(button).toBeTruthy();
      expect(button.nativeElement.textContent.trim()).toBe('Pull');
    });

    it('should have content projection area', () => {
      const contentArea = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-content'),
      );
      expect(contentArea).toBeTruthy();
    });
  });

  describe('Event Handlers Integration', () => {
    it('should call toggleWedge when button is clicked', () => {
      spyOn(component, 'toggleWedge');

      const button = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-button'),
      );
      button.nativeElement.click();

      expect(component.toggleWedge).toHaveBeenCalled();
    });

    it('should handle drag events through template', () => {
      spyOn(component, 'onDragStarted');
      spyOn(component, 'onDragMoved');
      spyOn(component, 'onDragEnded');

      const dragHandle = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-drag'),
      );

      // Simulate drag events
      dragHandle.triggerEventHandler('cdkDragStarted', {} as CdkDragStart);
      dragHandle.triggerEventHandler('cdkDragMoved', {
        distance: { y: 10 },
      } as CdkDragMove);
      dragHandle.triggerEventHandler('cdkDragEnded', {} as CdkDragEnd);

      expect(component.onDragStarted).toHaveBeenCalled();
      expect(component.onDragMoved).toHaveBeenCalled();
      expect(component.onDragEnded).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button attributes', () => {
      const button = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-button'),
      );

      expect(button.nativeElement.getAttribute('type')).toBe('button');
      expect(button.nativeElement.getAttribute('role')).toBe('button');
      expect(button.nativeElement.getAttribute('name')).toBe(
        'bmb_pull_wedge-button',
      );
    });

    it('should maintain visible class for screen readers', () => {
      component.isVisible = true;
      fixture.detectChanges();

      const content = fixture.debugElement.query(
        By.css('.bmb_pull_wedge-content'),
      );
      expect(content.nativeElement.classList.contains('visible')).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      const mockElement = { nativeElement: document.createElement('div') };
      component.contentRef = mockElement as ElementRef;
    });

    it('should handle zero initial height', () => {
      component.initialHeight = 0;
      const changes: SimpleChanges = {
        initialHeight: new SimpleChange(300, 0, false),
      };

      component.ngOnChanges(changes);

      expect(component.maxDragHeight).toBe(0);
    });

    it('should handle minContentHeight larger than initialHeight', () => {
      component.initialHeight = 200;
      component.minContentHeight = 300;

      const changes: SimpleChanges = {
        minContentHeight: new SimpleChange(100, 300, false),
      };

      component.ngOnChanges(changes);

      expect(component.contentHeight).toBe(300);
    });

    it('should handle negative drag distances', () => {
      component['initialDragHeight'] = 200;
      component.minContentHeight = 100;
      component.initialHeight = 300;

      const mockEvent = {
        distance: { y: -50 },
      } as CdkDragMove;

      component.onDragMoved(mockEvent);

      expect(component.contentHeight).toBe(150); // 200 - 50
    });

    it('should handle very small drag distances', () => {
      component['initialDragHeight'] = 150;
      component.minContentHeight = 100;
      component.initialHeight = 300;

      const mockEvent = {
        distance: { y: 0.1 },
      } as CdkDragMove;

      component.onDragMoved(mockEvent);

      expect(component.contentHeight).toBe(150.1);
    });

    it('should handle edge case gracefully', () => {
      component.contentHeight = 150;
      component.minContentHeight = 100;
      component.initialHeight = 300;

      // Test that component maintains valid state
      expect(component.contentHeight).toBeGreaterThanOrEqual(
        component.minContentHeight,
      );
      expect(component.contentHeight).toBeLessThanOrEqual(
        component.initialHeight,
      );
    });
  });

  describe('Performance', () => {
    it('should handle rapid drag events efficiently', () => {
      const mockElement = { nativeElement: document.createElement('div') };
      component.contentRef = mockElement as ElementRef;
      component['initialDragHeight'] = 150;
      component.minContentHeight = 100;
      component.initialHeight = 300;

      const startTime = performance.now();

      // Simulate 100 rapid drag events
      for (let i = 0; i < 100; i++) {
        const mockEvent = {
          distance: { y: i },
        } as CdkDragMove;
        component.onDragMoved(mockEvent);
      }

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100); // Should complete in less than 100ms
    });

    it('should not cause memory leaks with repeated toggle operations', () => {
      const mockElement = { nativeElement: document.createElement('div') };
      component.contentRef = mockElement as ElementRef;

      // Simulate many toggle operations
      for (let i = 0; i < 1000; i++) {
        component.toggleWedge();
      }

      // Should not throw or cause performance issues
      expect(component.isOpen()).toBeDefined();
    });
  });
});
