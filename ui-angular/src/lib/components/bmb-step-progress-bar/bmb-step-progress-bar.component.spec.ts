import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import {
  STEP_PROGRESS_BAR_MOBILE_TABLET_QUERY,
  truncateStepProgressLabel,
} from '../../_shared/logic/components/step-progress-bar';
import { BmbStepProgressBarComponent } from './bmb-step-progress-bar.component';

describe('BmbStepProgressBarComponent', () => {
  let component: BmbStepProgressBarComponent;
  let fixture: ComponentFixture<BmbStepProgressBarComponent>;
  let componentRef: ComponentRef<BmbStepProgressBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BmbStepProgressBarComponent],
      providers: [
        {
          provide: BmbTranslationsService,
          useValue: {
            translate: jest.fn((key: string) => key),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(BmbStepProgressBarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the configured step indexes', () => {
    componentRef.setInput('totalSteps', 4);
    expect(component.stepsArray).toEqual([0, 1, 2, 3]);
  });

  it('should update and emit the selected step', () => {
    const listener = jest.fn();
    component.onStepPress.subscribe(listener);
    component.handleStepClicked(2);
    expect(component.activeStep()).toBe(2);
    expect(listener).toHaveBeenCalledWith(2);
  });

  it('should emit a pressed step panel', () => {
    const listener = jest.fn();
    component.onStepPanelPress.subscribe(listener);

    component.handleStepPressed(3);

    expect(listener).toHaveBeenCalledWith(3);
  });

  it('should reset the active step for the step-panel type', () => {
    component.activeStep.set(3);
    componentRef.setInput('type', 'step-panel');

    component.ngOnInit();

    expect(component.activeStep()).toBe(0);
  });

  it('should expose one-based step numbers', () => {
    component.activeStep.set(2);
    expect(component.getStepNumber(0)).toBe(1);
    expect(component.getActiveStepNumber()).toBe(3);
  });

  it('should truncate labels using desktop and mobile limits', () => {
    const longLabel = 'a'.repeat(100);
    componentRef.setInput('labelSteps', [longLabel]);

    expect(component.maxChars()).toBe(90);
    expect(component.labelStepsTruncated()[0]).toHaveLength(91);

    component.isMobileOrTablet.set(true);

    expect(component.maxChars()).toBe(70);
    expect(component.labelStepsTruncated()[0]).toHaveLength(71);
  });

  it('should expose an empty label list when no labels are provided', () => {
    componentRef.setInput('labelSteps', undefined);

    expect(component.labelStepsTruncated()).toEqual([]);
  });

  it('should use configured complete and incomplete labels', () => {
    componentRef.setInput('labelComplete', 'Completed');
    componentRef.setInput('labelIncomplete', 'Pending');

    expect(component.labelCompleteTruncated()).toBe('Completed');
    expect(component.labelIncompleteTruncated()).toBe('Pending');
  });

  it('should use translated labels when custom labels are empty', () => {
    const translations = TestBed.inject(BmbTranslationsService);
    const translateSpy = jest
      .spyOn(translations, 'translate')
      .mockImplementation((key: string) => key);
    componentRef.setInput('labelComplete', '');
    componentRef.setInput('labelIncomplete', '');

    expect(component.labelCompleteTruncated()).toBe(
      'step_progress_bar.label_completed',
    );
    expect(component.labelIncompleteTruncated()).toBe(
      'step_progress_bar.label_pending',
    );
    expect(translateSpy).toHaveBeenCalledTimes(2);
  });

  it('should react to mobile media-query changes and clean up on destroy', () => {
    let changeListener: ((event: MediaQueryListEvent) => void) | undefined;
    const addEventListener = jest.fn(
      (_type: string, listener: (event: MediaQueryListEvent) => void) => {
        changeListener = listener;
      },
    );
    const originalMatchMedia = window.matchMedia;
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');
    window.matchMedia = jest.fn().mockReturnValue({
      matches: false,
      media: STEP_PROGRESS_BAR_MOBILE_TABLET_QUERY,
      addEventListener,
    });

    try {
      const responsiveFixture = TestBed.createComponent(
        BmbStepProgressBarComponent,
      );
      const responsiveComponent = responsiveFixture.componentInstance;

      expect(addEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
      changeListener?.({ matches: true } as MediaQueryListEvent);
      expect(responsiveComponent.isMobileOrTablet()).toBe(true);

      responsiveFixture.destroy();
      expect(abortSpy).toHaveBeenCalled();
    } finally {
      window.matchMedia = originalMatchMedia;
      abortSpy.mockRestore();
    }
  });

  it('should support environments without matchMedia', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = undefined as unknown as typeof window.matchMedia;

    try {
      const serverFixture = TestBed.createComponent(
        BmbStepProgressBarComponent,
      );
      expect(serverFixture.componentInstance.isMobileOrTablet()).toBe(false);
      serverFixture.destroy();
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });

  it('should use the default truncation limit', () => {
    expect(truncateStepProgressLabel('a'.repeat(91))).toHaveLength(91);
    expect(truncateStepProgressLabel('short')).toBe('short');
    expect(truncateStepProgressLabel()).toBe('');
  });
});
