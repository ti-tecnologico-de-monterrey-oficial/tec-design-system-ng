import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbMultiDotPaginatorComponent } from './bmb-multi-dot-paginator.component';
import { BmbMultiDotPaginatorItemComponent } from './bmb-multi-dot-paginator-item/bmb-multi-dot-paginator-item.component';
import { Component } from '@angular/core';

@Component({
  template: `
    <bmb-multi-dot-paginator
      componentTitle="Test title"
      subtitle="Test subtitle"
    >
      <bmb-multi-dot-paginator-item>Item 1</bmb-multi-dot-paginator-item>
      <bmb-multi-dot-paginator-item>Item 2</bmb-multi-dot-paginator-item>
      <bmb-multi-dot-paginator-item>Item 3</bmb-multi-dot-paginator-item>
    </bmb-multi-dot-paginator>
  `,
})
class TestHostComponent {}

describe('BmbMultiDotPaginatorComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let component: BmbMultiDotPaginatorComponent;
  let hostNativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [
        BmbMultiDotPaginatorComponent,
        BmbMultiDotPaginatorItemComponent,
      ],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostNativeElement = hostFixture.nativeElement;
    hostFixture.detectChanges();
    component = hostFixture.debugElement.children[0].componentInstance;
  });

  it('should create the paginator component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and subtitle from inputs', () => {
    const titleElement = hostNativeElement.querySelector(
      '.bmb_multi-dot-paginator-title',
    );
    const subtitleElement = hostNativeElement.querySelector(
      '.bmb_multi-dot-paginator-subtitle',
    );

    expect(titleElement?.textContent?.trim()).toBe('Test title');
    expect(subtitleElement?.textContent?.trim()).toBe('Test subtitle');
  });

  it('should initialize three dot items', () => {
    expect(component.numberOfElements.length).toBe(3);
    expect(component.selectedIndex()).toBe(0);
  });

  it('should set the first item active on init', () => {
    const activeItem = hostNativeElement.querySelector(
      '.bmb_multi-dot-paginator-item-active',
    );
    expect(activeItem).toBeTruthy();
  });

  it('should select the second dot when the corresponding button is clicked', () => {
    const dotButtons = hostNativeElement.querySelectorAll(
      '.bmb_multi-dot-paginator-dot',
    );
    const secondDot = dotButtons[1] as HTMLButtonElement;

    secondDot.click();
    hostFixture.detectChanges();

    expect(component.selectedIndex()).toBe(1);
    expect(secondDot.classList).toContain('bmb_multi-dot-paginator-dot-active');
  });

  it('should advance to the next item when the next button is clicked', () => {
    const nextButton = hostNativeElement.querySelector(
      '.bmb_multi-dot-paginator-next',
    ) as HTMLButtonElement;

    nextButton.click();
    hostFixture.detectChanges();

    expect(component.selectedIndex()).toBe(1);
  });

  it('should wrap to the first item after the last item using setNextItem()', () => {
    (component as any).selectItem(2);
    hostFixture.detectChanges();

    (component as any).setNextItem();
    hostFixture.detectChanges();

    expect(component.selectedIndex()).toBe(0);
  });

  it('should move to the previous item when prevItem() is called', () => {
    (component as any).selectItem(2);
    hostFixture.detectChanges();

    (component as any).prevItem();
    hostFixture.detectChanges();

    expect(component.selectedIndex()).toBe(1);
  });
});
