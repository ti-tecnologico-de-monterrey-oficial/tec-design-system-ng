import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbCardButtonEmpty } from './bmb-card-button-empty.component';

describe('BmbCardButtonEmpty', () => {
  let fixture: ComponentFixture<BmbCardButtonEmpty>;
  let component: BmbCardButtonEmpty;
  let componentRef: ComponentRef<BmbCardButtonEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbCardButtonEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbCardButtonEmpty);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('componentTitle', 'Title');
    componentRef.setInput('summaryText', 'Lorem ipsum');
    componentRef.setInput('currentCount', 0);
    componentRef.setInput('totalCount', '10');
    componentRef.setInput('emptyIcon', 'thumb_up');
    componentRef.setInput('emptyTitle', 'Empty title');
    componentRef.setInput(
      'emptyDescription',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    );
    componentRef.setInput('buttonText', 'Button');
    fixture.detectChanges();
  });

  it('should create and render the empty state', () => {
    expect(component).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.empty-card__header').textContent,
    ).toContain('Title');
    expect(
      fixture.nativeElement.querySelector('.empty-card__summary').textContent,
    ).toContain('0 / 10');
    expect(
      fixture.nativeElement.querySelector('.empty-card__state h3').textContent,
    ).toContain('Empty title');
    expect(
      fixture.nativeElement.querySelector('.empty-card__state p').textContent,
    ).toContain('Lorem ipsum dolor sit amet');
    expect(
      fixture.nativeElement.querySelector('.empty-card__icon'),
    ).toBeTruthy();
  });

  it('should emit buttonClick when the action is clicked', () => {
    spyOn(component.buttonClick, 'emit');

    fixture.nativeElement
      .querySelector('.empty-card__state button')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should disable the action button', () => {
    componentRef.setInput('isDisabled', true);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.empty-card__state button').disabled,
    ).toBeTrue();
  });
});
