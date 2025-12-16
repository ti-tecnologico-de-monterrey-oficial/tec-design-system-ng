import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbDropdownContentComponent } from './bmb-dropdown-content.component';
import { IDropdownItem } from '../../../types';
import { TranslatePipe } from '../../../pipes/translations';

class MockTranslatePipe {
  transform(value: string): string {
    return value;
  }
}

describe('BmbDropdownContentComponent', () => {
  let component: BmbDropdownContentComponent;
  let fixture: ComponentFixture<BmbDropdownContentComponent>;

  const mockItems: IDropdownItem[] = [
    {
      idItem: '1',
      text: 'First Option',
      selectedText: 'First Option',
      value: 'first',
      icon: 'home',
      action: jasmine.createSpy('action1'),
    },
    {
      idItem: '2',
      text: 'Second Option',
      selectedText: 'Second Option',
      value: 'second',
      icon: 'star',
      dotNotification: 3,
      action: jasmine.createSpy('action2'),
    },
    {
      idItem: '3',
      text: 'Third Option',
      selectedText: 'Third Option',
      value: 'third',
      icon: 'favorite',
      url: 'https://example.com',
      target: '_blank',
      action: jasmine.createSpy('action3'),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbDropdownContentComponent],
      providers: [{ provide: TranslatePipe, useClass: MockTranslatePipe }],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbDropdownContentComponent);
    component = fixture.componentInstance;
  });

  describe('Component Creation', () => {
    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      fixture.detectChanges();

      expect(component.items()).toEqual([]);
      expect(component.isKeyboardEvent()).toBeFalse();
      expect(component.enableFilter()).toBeFalse();
      expect(component.customFilterFunction()).toBeNull();
      expect(component.filterString()).toBe('');
    });
  });

  describe('Input Properties', () => {
    it('should set selectedOption', () => {
      fixture.componentRef.setInput('selectedOption', 'first');
      fixture.detectChanges();

      expect(component.selectedOption()).toBe('first');
    });

    it('should set selectedOption as array', () => {
      fixture.componentRef.setInput('selectedOption', ['first', 'second']);
      fixture.detectChanges();

      expect(component.selectedOption()).toEqual(['first', 'second']);
    });

    it('should set items', () => {
      component.items.set(mockItems);
      fixture.detectChanges();

      expect(component.items()).toEqual(mockItems);
    });

    it('should enable filter', () => {
      fixture.componentRef.setInput('enableFilter', true);
      fixture.detectChanges();

      expect(component.enableFilter()).toBeTrue();
    });

    it('should set custom filter function', () => {
      const customFilter = (item: IDropdownItem, filter: string) =>
        item.text.includes(filter);

      fixture.componentRef.setInput('customFilterFunction', customFilter);
      fixture.detectChanges();

      expect(component.customFilterFunction()).toBe(customFilter);
    });

    it('should set keyboard event flag', () => {
      component.isKeyboardEvent.set(true);
      fixture.detectChanges();

      expect(component.isKeyboardEvent()).toBeTrue();
    });
  });

  describe('Item Selection', () => {
    beforeEach(() => {
      component.items.set(mockItems);
      fixture.detectChanges();
    });

    it('should identify selected item with string selection', () => {
      fixture.componentRef.setInput('selectedOption', 'first');
      fixture.detectChanges();

      expect(component.isSelected('first')).toBeTrue();
      expect(component.isSelected('second')).toBeFalse();
    });

    it('should identify selected items with array selection', () => {
      fixture.componentRef.setInput('selectedOption', ['first', 'third']);
      fixture.detectChanges();

      expect(component.isSelected('first')).toBeTrue();
      expect(component.isSelected('second')).toBeFalse();
      expect(component.isSelected('third')).toBeTrue();
    });

    it('should return false when no selection', () => {
      expect(component.isSelected('first')).toBeFalse();
    });

    it('should handle undefined selectedOption', () => {
      fixture.componentRef.setInput('selectedOption', undefined);
      fixture.detectChanges();

      expect(component.isSelected('first')).toBeFalse();
    });
  });

  describe('Filtering Functionality', () => {
    beforeEach(() => {
      component.items.set(mockItems);
      fixture.componentRef.setInput('enableFilter', true);
      fixture.detectChanges();
    });

    it('should return all items when filter is empty', () => {
      expect(component.filteredItems()).toEqual(mockItems);
    });

    it('should filter items by text', () => {
      component.filterString.set('first');

      const filtered = component.filteredItems();
      expect(filtered).toHaveSize(1);
      expect(filtered[0].text).toBe('First Option');
    });

    it('should filter items by value', () => {
      component.filterString.set('second');

      const filtered = component.filteredItems();
      expect(filtered).toHaveSize(1);
      expect(filtered[0].value).toBe('second');
    });

    it('should filter items by selectedText', () => {
      component.filterString.set('third option');

      const filtered = component.filteredItems();
      expect(filtered).toHaveSize(1);
      expect(filtered[0].selectedText).toBe('Third Option');
    });

    it('should be case insensitive', () => {
      component.filterString.set('first');

      const filtered = component.filteredItems();
      expect(filtered).toHaveSize(1);
      expect(filtered[0].text).toBe('First Option');
    });

    it('should return empty array when no matches', () => {
      component.filterString.set('nonexistent');

      expect(component.filteredItems()).toHaveSize(0);
    });

    it('should use custom filter function when provided', () => {
      const customFilter = jasmine
        .createSpy('customFilter')
        .and.returnValue(true);
      fixture.componentRef.setInput('customFilterFunction', customFilter);
      fixture.detectChanges();

      component.filterString.set('test');
      const filtered = component.filteredItems();

      expect(customFilter).toHaveBeenCalledWith(mockItems[0], 'test');
      expect(filtered).toEqual(mockItems);
    });

    it('should handle filter list event', () => {
      const mockEvent = {
        target: { value: 'filter text' },
      } as unknown as Event;

      component.filterList(mockEvent);

      expect(component.filterString()).toBe('filter text');
    });
  });

  describe('Item Interaction', () => {
    beforeEach(() => {
      component.items.set(mockItems);
      fixture.detectChanges();
    });

    it('should handle dropdown item click', () => {
      spyOn(component.clickedItem, 'emit');

      component.handleDropdown(mockItems[0]);

      expect(mockItems[0].action).toHaveBeenCalled();
      expect(component.clickedItem.emit).toHaveBeenCalledWith(mockItems[0]);
    });

    it('should not emit or call action when item has no action', () => {
      spyOn(component.clickedItem, 'emit');
      const itemWithoutAction = { ...mockItems[0], action: undefined };

      component.handleDropdown(itemWithoutAction);

      expect(component.clickedItem.emit).not.toHaveBeenCalled();
    });

    it('should handle null/undefined item', () => {
      spyOn(component.clickedItem, 'emit');

      component.handleDropdown(null as any);
      component.handleDropdown(undefined as any);

      expect(component.clickedItem.emit).not.toHaveBeenCalled();
    });
  });

  describe('Template Rendering', () => {
    beforeEach(() => {
      component.items.set(mockItems);
      fixture.detectChanges();
    });

    it('should render all items', () => {
      const items = fixture.debugElement.queryAll(
        By.css(
          '.bmb_dropdown-content-item:not(.bmb_dropdown-content-item-filter)',
        ),
      );
      expect(items).toHaveSize(3);
    });

    it('should render filter input when enableFilter is true', () => {
      fixture.componentRef.setInput('enableFilter', true);
      fixture.detectChanges();

      const filterInput = fixture.debugElement.query(
        By.css('.bmb_dropdown-content-item-filter-input'),
      );
      expect(filterInput).toBeTruthy();
    });

    it('should not render filter input when enableFilter is false', () => {
      fixture.componentRef.setInput('enableFilter', false);
      fixture.detectChanges();

      const filterInput = fixture.debugElement.query(
        By.css('.bmb_dropdown-content-item-filter-input'),
      );
      expect(filterInput).toBeFalsy();
    });

    it('should apply selected class to selected items', () => {
      fixture.componentRef.setInput('selectedOption', 'first');
      fixture.detectChanges();

      const selectedItem = fixture.debugElement.query(
        By.css('.bmb_dropdown-content-item-selected'),
      );
      expect(selectedItem).toBeTruthy();
    });

    it('should render icons for items that have them', () => {
      const icons = fixture.debugElement.queryAll(
        By.css('.bmb_dropdown-content-item-icon'),
      );
      expect(icons).toHaveSize(3);
    });

    it('should render item text', () => {
      const textElements = fixture.debugElement.queryAll(
        By.css('.bmb_dropdown-content-item-text'),
      );
      expect(textElements).toHaveSize(3);
      expect(textElements[0].nativeElement.textContent.trim()).toBe(
        'First Option',
      );
    });

    it('should render dot notifications when present', () => {
      const itemIcons = fixture.debugElement.queryAll(
        By.css('.bmb_dropdown-content-item-icon'),
      );
      expect(itemIcons).toHaveSize(3);
      expect(itemIcons[1].componentInstance.dotNotification()).toBe(3);
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      component.items.set(mockItems);
      fixture.detectChanges();
    });

    it('should have proper tabindex on main container', () => {
      const mainContainer = fixture.debugElement.query(
        By.css('.bmb_dropdown-content-modal'),
      );
      expect(mainContainer.nativeElement.tabIndex).toBe(1);
    });

    it('should have proper tabindex on list container', () => {
      const listContainer = fixture.debugElement.query(
        By.css('.bmb_dropdown-content-container'),
      );
      expect(listContainer.nativeElement.tabIndex).toBe(-1);
    });

    it('should have proper id attributes on list items', () => {
      const listItems = fixture.debugElement.queryAll(By.css('li[id]'));
      expect(listItems[0].nativeElement.id).toBe('1');
      expect(listItems[1].nativeElement.id).toBe('2');
      expect(listItems[2].nativeElement.id).toBe('3');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty items array', () => {
      component.items.set([]);
      fixture.detectChanges();

      expect(component.filteredItems()).toEqual([]);

      const items = fixture.debugElement.queryAll(
        By.css(
          '.bmb_dropdown-content-item:not(.bmb_dropdown-content-item-filter)',
        ),
      );
      expect(items).toHaveSize(0);
    });

    it('should handle items without optional properties', () => {
      const minimalItems: IDropdownItem[] = [
        {
          text: 'Minimal Item',
          icon: '',
        },
      ];

      component.items.set(minimalItems);
      fixture.detectChanges();

      expect(component.filteredItems()).toEqual(minimalItems);
    });

    it('should handle filter with special characters', () => {
      component.items.set(mockItems);
      fixture.componentRef.setInput('enableFilter', true);
      fixture.detectChanges();

      component.filterString.set('!@#$%');

      expect(component.filteredItems()).toHaveSize(0);
    });
  });
});
