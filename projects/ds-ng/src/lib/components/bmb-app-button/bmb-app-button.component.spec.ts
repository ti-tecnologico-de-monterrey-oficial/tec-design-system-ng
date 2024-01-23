import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAppButtonComponent } from './bmb-app-button.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BmbAppButtonComponent', () => {
  let component: BmbAppButtonComponent;
  let fixture: ComponentFixture<BmbAppButtonComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BmbAppButtonComponent],
    });

    fixture = TestBed.createComponent(BmbAppButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display text when text input is provided', () => {
    component.text = 'Test Text';

    fixture.detectChanges();

    const buttonText = debugElement.query(By.css('button')).nativeElement
      .textContent;
    expect(buttonText).toContain('Test Text');
  });

  it('should display icon when icon input is provided', () => {
    component.icon = 'test-icon';

    fixture.detectChanges();

    const iconElement = debugElement.query(By.css('bmb-icon'));
    expect(iconElement).toBeTruthy();
    expect(iconElement.componentInstance.icon).toBe('test-icon');
  });

  it('should display image when image input is provided', () => {
    component.image = 'test-image.png';

    fixture.detectChanges();

    const imageElement = debugElement.query(By.css('img'));
    expect(imageElement).toBeTruthy();
    expect(imageElement.nativeElement.src).toContain('test-image.png');
  });

  it('should not display icon when icon input is not provided', () => {
    fixture.detectChanges();

    const iconElement = debugElement.query(By.css('bmb-icon'));
    expect(iconElement).toBeFalsy();
  });

  it('should not display image when image input is not provided', () => {
    fixture.detectChanges();

    const imageElement = debugElement.query(By.css('img'));
    expect(imageElement).toBeFalsy();
  });
});
