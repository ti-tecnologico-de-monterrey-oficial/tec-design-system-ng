import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BmbHomeCardHeaderComponent } from './bmb-home-card-header.component';
import { BmbProjectionContentService } from '../../../services/old/projection/projection.service';
import { IBmbActionHeader } from '../../../_shared/types/utils';

type Internals = {
  getHeaderAction: (i: number) => IBmbActionHeader;
  getIconName: () => string;
  getDataLocalNav: () => unknown[];
  handleBack: () => void;
  handleExpandChange: () => void;
  handleCloseChange: () => void;
  handleHeaderActionClick: (e: MouseEvent, a: IBmbActionHeader) => void;
  handleOpenActionMenu: (e: MouseEvent | KeyboardEvent) => void;
  handleCloseActionMenu: (e: MouseEvent, a: IBmbActionHeader) => void;
};

const makeActions = (n: number): IBmbActionHeader[] =>
  Array.from({ length: n }, (_, i) => ({
    icon: `icon${i}`,
    tooltipText: `tip${i}`,
    action: jest.fn(),
  })) as IBmbActionHeader[];

describe('BmbHomeCardHeaderComponent', () => {
  let fixture: ComponentFixture<BmbHomeCardHeaderComponent>;
  let component: BmbHomeCardHeaderComponent;
  let ref: ComponentRef<BmbHomeCardHeaderComponent>;
  let projection: BmbProjectionContentService;
  const internals = () => component as unknown as Internals;

  const create = (inputs: Record<string, unknown> = {}) => {
    fixture = TestBed.createComponent(BmbHomeCardHeaderComponent);
    component = fixture.componentInstance;
    ref = fixture.componentRef;
    ref.setInput('componentTitle', 'Title');
    Object.entries(inputs).forEach(([k, v]) => ref.setInput(k, v));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbHomeCardHeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    projection = TestBed.inject(BmbProjectionContentService);
  });

  it('should create and render the header', () => {
    create();
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('header')).toBeTruthy();
    expect(component.isGreaterThanLimit).toBe(false);
  });

  it('should throw when no title is provided', () => {
    fixture = TestBed.createComponent(BmbHomeCardHeaderComponent);
    expect(() => fixture.detectChanges()).toThrow(
      'The "componentTitle" input is required',
    );
  });

  it('should accept the deprecated title input', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    fixture = TestBed.createComponent(BmbHomeCardHeaderComponent);
    fixture.componentRef.setInput('title', 'Old');
    expect(() => fixture.detectChanges()).not.toThrow();
    warn.mockRestore();
  });

  it('should flag more than the general limit of actions', () => {
    create({ actionHeaders: makeActions(3) });
    expect(component.isGreaterThanLimit).toBe(true);
  });

  it('should throw when exceeding the max number of actions', () => {
    fixture = TestBed.createComponent(BmbHomeCardHeaderComponent);
    fixture.componentRef.setInput('componentTitle', 'Title');
    fixture.componentRef.setInput('actionHeaders', makeActions(9));
    expect(() => fixture.detectChanges()).toThrow();
  });

  it('should return the action by index', () => {
    const actions = makeActions(2);
    create({ actionHeaders: actions });
    expect(internals().getHeaderAction(1)).toBe(actions[1]);
  });

  it('should compute icon name depending on mobile', () => {
    create({ icon: 'home' });
    expect(internals().getIconName()).toBe('home');
    ref.setInput('isMobile', true);
    expect(internals().getIconName()).toBe('');
    ref.setInput('icon', undefined);
    ref.setInput('isMobile', false);
    expect(internals().getIconName()).toBe('');
  });

  it('should hide local nav on mobile', () => {
    const nav = [{ label: 'a' }];
    create({ dataLocalNav: nav });
    expect(internals().getDataLocalNav()).toBe(nav);
    ref.setInput('isMobile', true);
    expect(internals().getDataLocalNav()).toEqual([]);
  });

  it('should emit back and expand events', () => {
    create();
    const back = jest.fn();
    const expand = jest.fn();
    component.onBack.subscribe(back);
    component.onExpandClick.subscribe(expand);
    internals().handleBack();
    internals().handleExpandChange();
    expect(back).toHaveBeenCalledTimes(1);
    expect(expand).toHaveBeenCalledTimes(1);
  });

  it('should emit close and close the projected content', () => {
    create();
    const close = jest.fn();
    const spy = jest.spyOn(projection, 'closeContent');
    component.onClose.subscribe(close);
    internals().handleCloseChange();
    expect(close).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should run the header action when present', () => {
    const [withAction] = makeActions(1);
    create();
    const event = new MouseEvent('click');
    internals().handleHeaderActionClick(event, withAction);
    expect(withAction.action).toHaveBeenCalledWith(event, withAction);

    expect(() =>
      internals().handleHeaderActionClick(event, {
        icon: 'x',
      } as IBmbActionHeader),
    ).not.toThrow();
  });

  it('should open the action menu with the event target', () => {
    create();
    const open = jest.spyOn(projection, 'openContent').mockReturnValue('menu-1');
    const target = document.createElement('button');
    const event = { target } as unknown as MouseEvent;
    internals().handleOpenActionMenu(event);
    expect(open).toHaveBeenCalledWith(
      expect.objectContaining({ targetRef: target }),
    );
    expect(component.idActionMenu()).toBe('menu-1');
  });

  it('should not open the action menu without a target', () => {
    create();
    const open = jest.spyOn(projection, 'openContent');
    internals().handleOpenActionMenu({ target: null } as unknown as MouseEvent);
    expect(open).not.toHaveBeenCalled();
  });

  it('should run action and close menu from the action menu', () => {
    const [action] = makeActions(1);
    create();
    const close = jest.spyOn(projection, 'closeContent');
    const event = new MouseEvent('click');
    internals().handleCloseActionMenu(event, action);
    expect(action.action).toHaveBeenCalledWith(event, action);
    expect(close).toHaveBeenCalled();

    internals().handleCloseActionMenu(event, { icon: 'x' } as IBmbActionHeader);
    expect(close).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['desktop, few actions', { actionHeaders: makeActions(2) }],
    ['desktop, many actions', { actionHeaders: makeActions(4) }],
    ['desktop without right button', { showRightButton: false }],
    ['mobile, no actions', { isMobile: true }],
    [
      'mobile, no actions, no right button',
      { isMobile: true, showRightButton: false },
    ],
    [
      'mobile, single action without right button',
      {
        isMobile: true,
        showRightButton: false,
        actionHeaders: makeActions(1),
      },
    ],
    ['mobile, several actions', { isMobile: true, actionHeaders: makeActions(3) }],
    ['left icon', { leftIcon: 'arrow_back' }],
  ])('should render: %s', (_name, inputs) => {
    create(inputs as Record<string, unknown>);
    expect(fixture.nativeElement.querySelector('header')).toBeTruthy();
  });
});
