import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbDropdownContentComponent } from './bmb-dropdown-content.component';
import { IDropdownItem } from '../../../_shared/types';
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
      action: jest.fn(),
    },
    {
      idItem: '2',
      text: 'Second Option',
      selectedText: 'Second Option',
      value: 'second',
      icon: 'star',
      dotNotification: 3,
      action: jest.fn(),
    },
    {
      idItem: '3',
      text: 'Third Option',
      selectedText: 'Third Option',
      value: 'third',
      icon: 'favorite',
      url: 'https://example.com',
      target: '_blank',
      action: jest.fn(),
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
      expect(component.isKeyboardEvent()).toBe(false);
      expect(component.enableFilter()).toBe(false);
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

      expect(component.enableFilter()).toBe(true);
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

      expect(component.isKeyboardEvent()).toBe(true);
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

      expect(component.isSelected('first')).toBe(true);
      expect(component.isSelected('second')).toBe(false);
    });

    it('should identify selected items with array selection', () => {
      fixture.componentRef.setInput('selectedOption', ['first', 'third']);
      fixture.detectChanges();

      expect(component.isSelected('first')).toBe(true);
      expect(component.isSelected('second')).toBe(false);
      expect(component.isSelected('third')).toBe(true);
    });

    it('should return false when no selection', () => {
      expect(component.isSelected('first')).toBe(false);
    });

    it('should handle undefined selectedOption', () => {
      fixture.componentRef.setInput('selectedOption', undefined);
      fixture.detectChanges();

      expect(component.isSelected('first')).toBe(false);
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
      expect(filtered).toHaveLength(1);
      expect(filtered[0].text).toBe('First Option');
    });

    it('should filter items by value', () => {
      component.filterString.set('second');

      const filtered = component.filteredItems();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].value).toBe('second');
    });

    it('should filter items by selectedText', () => {
      component.filterString.set('third option');

      const filtered = component.filteredItems();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].selectedText).toBe('Third Option');
    });

    it('should be case insensitive', () => {
      component.filterString.set('first');

      const filtered = component.filteredItems();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].text).toBe('First Option');
    });

    it('should return empty array when no matches', () => {
      component.filterString.set('nonexistent');

      expect(component.filteredItems()).toHaveLength(0);
    });

    it('should use custom filter function when provided', () => {
      const customFilter = jest.fn(() => true);
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
      jest.spyOn(component.clickedItem, 'emit');

      component.handleDropdown(mockItems[0]);

      expect(mockItems[0].action).toHaveBeenCalled();
      expect(component.clickedItem.emit).toHaveBeenCalledWith(mockItems[0]);
    });

    it('should not emit or call action when item has no action', () => {
      jest.spyOn(component.clickedItem, 'emit');
      const itemWithoutAction = { ...mockItems[0], action: undefined };

      component.handleDropdown(itemWithoutAction);

      expect(component.clickedItem.emit).not.toHaveBeenCalled();
    });

    it('should handle null/undefined item', () => {
      jest.spyOn(component.clickedItem, 'emit');

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
      expect(items).toHaveLength(3);
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
        By.css('.bmb_dropdown-content-element-icon'),
      );
      expect(icons).toHaveLength(3);
    });

    it('should render item text', () => {
      const textElements = fixture.debugElement.queryAll(
        By.css('.bmb_dropdown-content-element-text'),
      );
      expect(textElements).toHaveLength(3);
      expect(textElements[0].nativeElement.textContent.trim()).toBe(
        'First Option',
      );
    });

    it('should render dot notifications when present', () => {
      const itemIcons = fixture.debugElement.queryAll(
        By.css('.bmb_dropdown-content-element-icon'),
      );
      expect(itemIcons).toHaveLength(3);
      expect(itemIcons[1].componentInstance.dotNotification()).toBe(3);
    });
  });

  describe('Multi-select', () => {
    beforeEach(() => jest.clearAllMocks());
    beforeEach(() => {
      component.items.set(mockItems);
      fixture.componentRef.setInput('isMultiSelect', true);
      fixture.detectChanges();
    });

    it('renders search before select-all and before the options', () => {
      fixture.componentRef.setInput('enableFilter', true);
      fixture.detectChanges();
      const rows = fixture.nativeElement.querySelectorAll('li');
      expect(rows[0].querySelector('input')).not.toBeNull();
      expect(rows[1].id).toBe('select_all');
      expect(rows[2].id).toBe('1');
    });

    it('selects and deselects filtered results while retaining hidden selections', () => {
      fixture.componentRef.setInput('enableFilter', true);
      fixture.componentRef.setInput('selectedOption', ['third']);
      fixture.detectChanges();
      component.filterString.set('first');
      component.handleSelectedAll();
      expect(component.selectionState()).toEqual(['third', 'first']);
      expect(component.isAllSelected()).toBe(true);
      expect(component.isIndeterminate()).toBe(false);
      expect(mockItems[0].action).toHaveBeenCalledTimes(1);
      expect(mockItems[1].action).not.toHaveBeenCalled();
      expect(mockItems[2].action).not.toHaveBeenCalled();
      component.handleSelectedAll();
      expect(component.selectionState()).toEqual(['third']);
      expect(mockItems[0].action).toHaveBeenCalledTimes(2);
      component.filterString.set('');
      expect(component.filteredItems()).toEqual(mockItems);
      expect(component.isSelected('third')).toBe(true);
      expect(component.isIndeterminate()).toBe(true);
    });

    it('adds only missing matches for partial filtered selections', () => {
      fixture.componentRef.setInput('enableFilter', true);
      fixture.componentRef.setInput('selectedOption', ['first', 'third']);
      fixture.componentRef.setInput(
        'customFilterFunction',
        (item: IDropdownItem) => item.value !== 'third',
      );
      fixture.detectChanges();
      component.filterString.set('query');
      expect(component.isAllSelected()).toBe(false);
      expect(component.isIndeterminate()).toBe(true);
      component.handleSelectedAll();
      expect(component.selectionState()).toEqual(['first', 'third', 'second']);
      expect(mockItems[0].action).not.toHaveBeenCalled();
      expect(mockItems[1].action).toHaveBeenCalledTimes(1);
      expect(mockItems[2].action).not.toHaveBeenCalled();
      component.filterString.set('');
      expect(component.isAllSelected()).toBe(true);
    });

    it('disables select-all with no matches without changing the selection', () => {
      fixture.componentRef.setInput('enableFilter', true);
      fixture.componentRef.setInput('selectedOption', ['third']);
      fixture.detectChanges();
      component.filterString.set('no matches');
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('#select_all button').disabled,
      ).toBe(true);
      expect(component.isAllSelected()).toBe(false);
      expect(component.isIndeterminate()).toBe(false);
      component.handleSelectedAll();
      expect(component.selectionState()).toEqual(['third']);
      mockItems.forEach((item) => expect(item.action).not.toHaveBeenCalled());
    });

    it('should report indeterminate when some but not all items are selected', () => {
      fixture.componentRef.setInput('selectedOption', ['first']);
      fixture.detectChanges();

      expect(component.isIndeterminate()).toBe(true);
      expect(component.isAllSelected()).toBe(false);
    });

    it('should report all selected when every item is selected', () => {
      fixture.componentRef.setInput('selectedOption', [
        'first',
        'second',
        'third',
      ]);
      fixture.detectChanges();

      expect(component.isAllSelected()).toBe(true);
      expect(component.isIndeterminate()).toBe(false);
    });

    it('should add the item to the selection on handleDropdown', () => {
      component.handleDropdown(mockItems[0]);

      expect(component.isSelected('first')).toBe(true);
    });

    it('should remove the item from the selection when already selected', () => {
      fixture.componentRef.setInput('selectedOption', ['first']);
      fixture.detectChanges();

      component.handleDropdown(mockItems[0]);

      expect(component.isSelected('first')).toBe(false);
    });

    it('should select every item through handleSelectedAll', () => {
      component.handleSelectedAll();

      expect(component.isSelected('first')).toBe(true);
      expect(component.isSelected('second')).toBe(true);
      expect(component.isSelected('third')).toBe(true);
      mockItems.forEach((item) => expect(item.action).toHaveBeenCalled());
    });

    it('should clear every selection through handleSelectedAll when all are already selected', () => {
      fixture.componentRef.setInput('selectedOption', [
        'first',
        'second',
        'third',
      ]);
      fixture.detectChanges();

      component.handleSelectedAll();

      expect(component.isSelected('first')).toBe(false);
      expect(component.isAllSelected()).toBe(false);
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
          '.bmb_dropdown-content-item:has(.bmb_dropdown-content-item-empty)',
        ),
      );
      expect(items).toHaveLength(0);
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

      expect(component.filteredItems()).toHaveLength(0);
    });
  });
});
