import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTimepickerComponent } from './bmb-timepicker.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../services/projection/projection.service';
import { BmbDropdownContentComponent } from '../utils/bmb-dropdown-content/bmb-dropdown-content.component';
import { BmbTimepickerModalComponent } from './bmb-timepicker-modal/bmb-timepicker-modal.component';
import { IDropdownItem } from '../../_shared/types';

describe('BmbTimepickerComponent', () => {
  let component: BmbTimepickerComponent;
  let fixture: ComponentFixture<BmbTimepickerComponent>;
  let viewport: BehaviorSubject<BreakpointState>;
  let projectedContent: IBmbProjectionContent | undefined;
  let projection: {
    openContent: jest.Mock;
    closeContent: jest.Mock;
  };
  let observe: jest.Mock;

  beforeEach(async () => {
    viewport = new BehaviorSubject<BreakpointState>({
      matches: false,
      breakpoints: {},
    });
    projectedContent = undefined;
    observe = jest.fn(() => viewport.asObservable());
    projection = {
      openContent: jest.fn((content: IBmbProjectionContent) => {
        projectedContent = content;
      }),
      closeContent: jest.fn((id: string) => {
        if (projectedContent?.id !== id) return;
        const content = projectedContent;
        projectedContent = undefined;
        content.afterCloseContent?.({ contentId: id, reason: 'single' });
      }),
    };
    await TestBed.configureTestingModule({
      imports: [BmbTimepickerComponent, BmbTimepickerModalComponent],
      providers: [
        { provide: BreakpointObserver, useValue: { observe } },
        { provide: BmbProjectionContentService, useValue: projection },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(BmbTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse 12h and 24h values', () => {
    expect(component.parseTime('02:30 PM')).toEqual({ hour: 14, minute: 30 });
    expect(component.parseTime('12:05 AM')).toEqual({ hour: 0, minute: 5 });
    expect(component.parseTime('23:59')).toEqual({ hour: 23, minute: 59 });
    expect(component.parseTime('25:00')).toBeNull();
    expect(component.parseTime('')).toBeNull();
    expect(
      component.parseTime(`02:30${' '.repeat(100_000)}PM`),
    ).toEqual({ hour: 14, minute: 30 });
  });

  it('should write the formatted value to the control on selection', () => {
    const emitted: string[] = [];
    component.getChange.subscribe((v) => emitted.push(v));
    component.selectHour(9);
    component.selectMinute(15);
    component.selectPeriod('PM');
    expect(component.control().value).toBe('09:15 PM');
    expect(emitted.at(-1)).toBe('09:15 PM');
  });

  it('should expose modal selection state as boolean aria-selected values', () => {
    const modalFixture = TestBed.createComponent(BmbTimepickerModalComponent);
    modalFixture.componentRef.setInput('hours', [9, 10]);
    modalFixture.componentRef.setInput('minutes', [0, 15]);
    modalFixture.componentInstance.displayHour.set(9);
    modalFixture.componentInstance.currentPage.set('hour');
    modalFixture.detectChanges();

    let options: NodeListOf<HTMLLIElement> =
      modalFixture.nativeElement.querySelectorAll('li');
    expect(options[0].getAttribute('aria-selected')).toBe('true');
    expect(options[1].getAttribute('aria-selected')).toBe('false');

    modalFixture.componentInstance.currentPage.set('minute');
    modalFixture.componentInstance.selectedMinute.set(15);
    modalFixture.detectChanges();
    options = modalFixture.nativeElement.querySelectorAll('li');
    expect(options[0].getAttribute('aria-selected')).toBe('false');
    expect(options[1].getAttribute('aria-selected')).toBe('true');
  });

  function compact(): void {
    viewport.next({ matches: true, breakpoints: {} });
    fixture.detectChanges();
  }

  function selectOption(value: string): void {
    const items: IDropdownItem[] = projectedContent?.inputContext?.['items'];
    const item = items.find((option) => option.value === value);
    expect(item).toBeDefined();
    item?.action?.();
    fixture.detectChanges();
  }

  it('should use full time selectors above 1000px and an input at compact widths', () => {
    expect(observe).toHaveBeenCalledWith('(max-width: 1000px)');
    expect(
      fixture.nativeElement.querySelectorAll('.bmb_timepicker-select').length,
    ).toBe(2);
    expect(fixture.nativeElement.querySelector('bmb-input-content')).toBeNull();

    compact();
    expect(
      fixture.nativeElement.querySelectorAll('.bmb_timepicker-select').length,
    ).toBe(0);
    const timeInput: HTMLInputElement = fixture.nativeElement.querySelector(
      'bmb-input-content input',
    );
    expect(timeInput.id).toBe(component.inputId());
  });

  it('should select combined times respecting minuteStep and preserve the period', () => {
    fixture.componentRef.setInput('minuteStep', 30);
    component.control().setValue('09:30 PM');
    compact();
    const emit = jest.spyOn(component.getChange, 'emit');
    component.openCompactList('time');
    expect(projectedContent?.content).toBe(BmbDropdownContentComponent);
    expect(projectedContent?.forceMobileCenter).toBe(false);
    expect(projectedContent?.dialogClass).toBe(
      'bmb_projected-content-anchor-mobile',
    );
    expect(projectedContent?.targetRef).toBe(
      component.timeRef()?.nativeElement,
    );
    const items: IDropdownItem[] = projectedContent?.inputContext?.['items'];
    expect(items).toHaveLength(24);
    expect(items.map(({ value }) => value)).toContain('12:00');
    expect(items.map(({ value }) => value)).not.toContain('09:15');
    selectOption('12:00');
    expect(component.control().value).toBe('12:00 PM');
    expect(component.control().dirty).toBe(true);
    expect(component.control().touched).toBe(true);
    expect(emit).toHaveBeenCalledWith('12:00 PM');
    expect(component.activeDropdown()).toBeNull();
  });

  it('should switch AM/PM without changing hours or minutes, including midnight', () => {
    component.control().setValue('12:45 PM');
    compact();
    component.openCompactList('period');
    expect(projectedContent?.targetRef).toBe(
      component.periodRef()?.nativeElement,
    );
    expect(projectedContent?.inputContext?.['selectedOption']).toBe('PM');
    selectOption('AM');
    expect(component.control().value).toBe('12:45 AM');
    expect(component.selectedHour()).toBe(0);
    component.openCompactList('time');
    selectOption('09:45');
    expect(component.control().value).toBe('09:45 AM');
  });

  it('should show one time selector with all 24 hours in 24h format', () => {
    fixture.componentRef.setInput('format', '24h');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelectorAll('.bmb_timepicker-select').length,
    ).toBe(1);
    component.openCompactList('time');
    const items: IDropdownItem[] = projectedContent?.inputContext?.['items'];
    expect(items).toHaveLength(96);
    selectOption('23:45');
    expect(component.control().value).toBe('23:45');
  });

  it('should keep external values, resets and clear actions in sync', () => {
    fixture.componentRef.setInput('isClearable', true);
    compact();
    component.control().setValue('08:17 PM');
    fixture.detectChanges();
    expect(component.displayTime()).toBe('08:17');
    expect(component.period()).toBe('PM');
    expect(
      fixture.nativeElement.querySelector('bmb-input-content bmb-action-icon'),
    ).toBeTruthy();
    const emit = jest.spyOn(component.getChange, 'emit');
    component.clearValue();
    fixture.detectChanges();
    expect(component.control().value).toBeNull();
    expect(component.displayTime()).toBe('');
    expect(emit).toHaveBeenCalledWith('');
    expect(
      fixture.nativeElement.querySelector('bmb-input-content bmb-action-icon'),
    ).toBeTruthy();
  });

  it.each(['input', 'control'])(
    'should not open disabled dropdowns via %s',
    (source) => {
      if (source === 'input') fixture.componentRef.setInput('disabled', true);
      else component.control().disable();
      compact();
      const buttons: NodeListOf<HTMLButtonElement> =
        fixture.nativeElement.querySelectorAll('.bmb_timepicker-select');
      buttons.forEach((button) => expect(button.disabled).toBe(true));
      component.openCompactList('time');
      component.openCompactList('period');
      expect(projection.openContent).not.toHaveBeenCalled();
    },
  );

  it('should close an open compact dropdown on resize and keep the selected value', () => {
    fixture.componentRef.setInput('control', new FormControl('09:30 PM'));
    compact();
    component.openCompactList('period');
    viewport.next({ matches: false, breakpoints: {} });
    fixture.detectChanges();
    expect(projectedContent).toBeUndefined();
    expect(component.activeDropdown()).toBeNull();
    expect(component.control().value).toBe('09:30 PM');
    component.openList();
    expect(projectedContent?.content).toBe(BmbTimepickerModalComponent);
    expect(projectedContent?.targetRef).toBe(
      component.contentRef?.nativeElement,
    );
  });

  it('should close its own dropdown on destruction', () => {
    compact();
    component.openCompactList('time');
    fixture.destroy();
    expect(projectedContent).toBeUndefined();
  });
});
