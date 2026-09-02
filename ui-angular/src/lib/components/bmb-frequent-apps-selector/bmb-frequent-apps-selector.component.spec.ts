import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbFrequentAppsSelectorComponent } from './bmb-frequent-apps-selector.component';
import { IBmbApp } from '../../_shared/types';

describe('BmbFrequentAppsSelectorComponent', () => {
  let component: BmbFrequentAppsSelectorComponent;
  let fixture: ComponentFixture<BmbFrequentAppsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbFrequentAppsSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbFrequentAppsSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build the container classes based on layout', () => {
    fixture.detectChanges();
    expect(component.getClassesFAC()).toEqual([
      'bmb_frequent_apps-container',
      'bmb_frequent_apps-container-regular',
    ]);

    fixture.componentRef.setInput('layout', 'button');
    fixture.detectChanges();

    expect(component.getClassesFAC()).toEqual([
      'bmb_frequent_apps-container',
      'bmb_frequent_apps-container-button',
    ]);
  });

  it('should emit the callbackParam when provided', () => {
    const app: IBmbApp = {
      icon: 'home',
      title: 'Home',
      appearance: 'red',
      callbackParam: { id: 1 },
    };
    const emitSpy = jest.fn();
    component.appClick.subscribe(emitSpy);

    component.handleButtonClick(app);

    expect(emitSpy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should emit the app itself when callbackParam is not provided', () => {
    const app: IBmbApp = {
      icon: 'home',
      title: 'Home',
      appearance: 'red',
    };
    const emitSpy = jest.fn();
    component.appClick.subscribe(emitSpy);

    component.handleButtonClick(app);

    expect(emitSpy).toHaveBeenCalledWith(app);
  });
});
