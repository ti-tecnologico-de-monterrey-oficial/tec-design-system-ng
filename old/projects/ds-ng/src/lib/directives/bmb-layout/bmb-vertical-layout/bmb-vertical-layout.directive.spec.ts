import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbVerticalLayoutDirective } from './bmb-vertical-layout.directive';

@Component({
  template: `
    <section id="layout" bmbVerticalLayout [layoutHeight]="height"></section>
  `,
  standalone: true,
  imports: [BmbVerticalLayoutDirective],
})
class TestHostComponent {
  height = 'auto';
}

describe('BmbVerticalLayoutDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.nativeElement.querySelector('#layout') as HTMLElement;
  });

  it('should set default height to auto', () => {
    expect(getComputedStyle(host).height).toBeDefined();
  });

  it('should update host height when layoutHeight changes', () => {
    const component = fixture.componentInstance;

    component.height = '200px';
    fixture.detectChanges();

    expect(host.style.height).toBe('200px');
  });
});
