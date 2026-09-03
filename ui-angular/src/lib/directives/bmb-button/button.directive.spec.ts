import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BmbButtonDirective } from './button.directive';

@Component({
  template: `<button bmbButton>Click</button>`,
  imports: [BmbButtonDirective],
})
class TestHostComponent {}

describe('ButtonDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: BmbButtonDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    directive = fixture.debugElement
      .query(By.directive(BmbButtonDirective))
      .injector.get(BmbButtonDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
