import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BmbTopBarItemComponent } from './bmb-top-bar-item.component';

describe('BmbTopBarItemComponent', () => {
  let component: BmbTopBarItemComponent;
  let componentRef: ComponentRef<BmbTopBarItemComponent>;
  let fixture: ComponentFixture<BmbTopBarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbTopBarItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTopBarItemComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create with the inactive state by default', () => {
    const item: HTMLDivElement =
      fixture.nativeElement.querySelector('.bmb_top-bar-item');

    expect(component).toBeTruthy();
    expect(component.isActive()).toBe(false);
    expect(item.classList).toContain('bmb_top-bar-item');
    expect(item.classList).not.toContain('bmb_top-bar-item-active');
  });

  it('should add and remove the active class', () => {
    componentRef.setInput('isActive', true);
    fixture.detectChanges();
    let item: HTMLDivElement =
      fixture.nativeElement.querySelector('.bmb_top-bar-item');
    expect(item.classList).toContain('bmb_top-bar-item-active');

    componentRef.setInput('isActive', false);
    fixture.detectChanges();
    item = fixture.nativeElement.querySelector('.bmb_top-bar-item');
    expect(item.classList).not.toContain('bmb_top-bar-item-active');
  });

  it('should render its content inside the list-item host', () => {
    const item: HTMLDivElement =
      fixture.nativeElement.querySelector('.bmb_top-bar-item');

    expect(item.tagName).toBe('DIV');
    expect(fixture.nativeElement.getAttribute('role')).toBe('listitem');
  });
});
