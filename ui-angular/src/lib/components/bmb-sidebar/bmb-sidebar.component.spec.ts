import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbSidebarComponent } from './bmb-sidebar.component';
import { SidebarElement } from '../../_shared/types';

describe('BmbSidebarComponent', () => {
  let component: BmbSidebarComponent;
  let fixture: ComponentFixture<BmbSidebarComponent>;

  const createSidebarElement = (
    id: number,
    title: string,
    link?: string,
    children?: SidebarElement[],
  ): SidebarElement => ({
    id,
    icon: 'home',
    title,
    link,
    children,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close sidebar and clear selected element open state', () => {
    const selected = createSidebarElement(5, 'Menu', '/menu');
    selected.isOpen = true;
    component.isOpen = true;

    component['closeSidebar'](selected);

    expect(component.isOpen).toBeFalse();
    expect(selected.isOpen).toBeFalse();
  });

  it('should toggle children open state', () => {
    const selected = createSidebarElement(6, 'Nested', '/nested');
    selected.isOpen = false;

    component['toggleChildren'](selected);
    expect(selected.isOpen).toBeTrue();

    component['toggleChildren'](selected);
    expect(selected.isOpen).toBeFalse();
  });

  it('should do nothing when toggling children with no selected element', () => {
    expect(() =>
      component['toggleChildren'](null as unknown as SidebarElement),
    ).not.toThrow();
  });

  describe('hasChildren', () => {
    it('should be true when the element has children', () => {
      const selected = createSidebarElement(1, 'Parent', undefined, [
        createSidebarElement(2, 'Child'),
      ]);
      expect(component['hasChildren'](selected)).toBeTrue();
    });

    it('should be false when the element has no children', () => {
      const selected = createSidebarElement(1, 'Leaf', '/leaf');
      expect(component['hasChildren'](selected)).toBeFalse();
    });
  });

  describe('getLink', () => {
    it('should return an empty string when the element has children', () => {
      const selected = createSidebarElement(1, 'Parent', '/parent', [
        createSidebarElement(2, 'Child'),
      ]);
      expect(component['getLink'](selected)).toBe('');
    });

    it('should return the link when the element has no children', () => {
      const selected = createSidebarElement(1, 'Leaf', '/leaf');
      expect(component['getLink'](selected)).toBe('/leaf');
    });

    it('should return an empty string when there is no link', () => {
      const selected = createSidebarElement(1, 'Leaf');
      expect(component['getLink'](selected)).toBe('');
    });
  });

  describe('closeSidebar', () => {
    it('should do nothing when there is no selected element', () => {
      component.isOpen = true;
      component['closeSidebar'](null as unknown as SidebarElement);
      expect(component.isOpen).toBeTrue();
    });
  });

  describe('clearSelectElement', () => {
    it('should do nothing when there is no selected element', () => {
      expect(() =>
        component['clearSelectElement'](null as unknown as SidebarElement),
      ).not.toThrow();
    });
  });

  describe('checkForCustomEvent', () => {
    it('should close the parent and run the event when the element is a leaf without a link', () => {
      const eventSpy = jest.fn();
      const selected = createSidebarElement(1, 'Leaf');
      selected.event = eventSpy;
      const parent = createSidebarElement(2, 'Parent');
      component.isOpen = true;

      component['checkForCustomEvent'](selected, parent);

      expect(selected.isOpen).toBeTrue();
      expect(component.isOpen).toBeFalse();
      expect(eventSpy).toHaveBeenCalledWith(selected);
    });

    it('should close the parent without an event when the element has none', () => {
      const selected = createSidebarElement(1, 'Leaf');
      const parent = createSidebarElement(2, 'Parent');
      component.isOpen = true;

      component['checkForCustomEvent'](selected, parent);

      expect(component.isOpen).toBeFalse();
    });

    it('should only toggle children when the element has a link', () => {
      const selected = createSidebarElement(1, 'Leaf', '/leaf');
      const parent = createSidebarElement(2, 'Parent');
      component.isOpen = true;

      component['checkForCustomEvent'](selected, parent);

      expect(selected.isOpen).toBeTrue();
      expect(component.isOpen).toBeTrue();
    });

    it('should only toggle children when the element has children', () => {
      const selected = createSidebarElement(1, 'Parent', undefined, [
        createSidebarElement(2, 'Child'),
      ]);
      const parent = createSidebarElement(3, 'Root');
      component.isOpen = true;

      component['checkForCustomEvent'](selected, parent);

      expect(selected.isOpen).toBeTrue();
      expect(component.isOpen).toBeTrue();
    });

    it('should do nothing when there is no selected element', () => {
      const parent = createSidebarElement(1, 'Parent');
      expect(() =>
        component['checkForCustomEvent'](
          null as unknown as SidebarElement,
          parent,
        ),
      ).not.toThrow();
    });
  });

  describe('handleClose', () => {
    it('should remove the open class from children when the sidebar is closed', () => {
      component.isOpen = false;
      const child = document.createElement('div');
      child.className = 'bmb_sidebar-children open';
      document.body.appendChild(child);

      component['handleClose']();

      expect(child.classList.contains('open')).toBeFalse();
      document.body.removeChild(child);
    });

    it('should do nothing while the sidebar is open', () => {
      component.isOpen = true;
      const child = document.createElement('div');
      child.className = 'bmb_sidebar-children open';
      document.body.appendChild(child);

      component['handleClose']();

      expect(child.classList.contains('open')).toBeTrue();
      document.body.removeChild(child);
    });
  });

  describe('validation effect', () => {
    it('should flag an error when there are more than two groups', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation();
      fixture.componentRef.setInput('elements', [
        [createSidebarElement(1, 'A')],
        [createSidebarElement(2, 'B')],
        [createSidebarElement(3, 'C')],
      ]);
      fixture.detectChanges();

      expect(component.error).toBeTrue();
      errorSpy.mockRestore();
    });

    it('should flag an error when there are more than eight elements in the first level', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation();
      fixture.componentRef.setInput('elements', [
        Array.from({ length: 9 }, (_, i) => createSidebarElement(i, `Item ${i}`)),
      ]);
      fixture.detectChanges();

      expect(component.error).toBeTrue();
      errorSpy.mockRestore();
    });

    it('should not flag an error for a valid configuration', () => {
      fixture.componentRef.setInput('elements', [
        [createSidebarElement(1, 'A')],
      ]);
      fixture.detectChanges();

      expect(component.error).toBeFalse();
    });
  });
});
