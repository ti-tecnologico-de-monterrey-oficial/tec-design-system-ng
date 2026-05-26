import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { BmbTextEditorComponent } from './bmb-text-editor.component';
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BmbTextEditorComponent', () => {
  let component: BmbTextEditorComponent;
  let fixture: ComponentFixture<BmbTextEditorComponent>;
  let mockProjectionService: jasmine.SpyObj<BmbProjectionContentService>;
  let mockSanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(async () => {
    mockProjectionService = jasmine.createSpyObj(
      'BmbProjectionContentService',
      ['openContent', 'closeContent'],
    );

    mockSanitizer = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustHtml',
    ]);
    mockSanitizer.bypassSecurityTrustHtml.and.returnValue('<p>test</p>' as any);

    await TestBed.configureTestingModule({
      imports: [BmbTextEditorComponent, NoopAnimationsModule],
      providers: [
        {
          provide: BmbProjectionContentService,
          useValue: mockProjectionService,
        },
        { provide: DomSanitizer, useValue: mockSanitizer },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbTextEditorComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default FormControl if none provided', () => {
      fixture.detectChanges();
      expect(component.control()).toBeInstanceOf(FormControl);
      expect(component.control().value).toBe('');
    });

    it('should use provided FormControl', () => {
      const customControl = new FormControl('<p>Initial content</p>');
      fixture.componentRef.setInput('control', customControl);
      fixture.detectChanges();

      expect(component.control()).toBe(customControl);
      expect(component.control().value).toBe('<p>Initial content</p>');
    });

    it('should sanitize initial content', () => {
      const customControl = new FormControl('<p>Test content</p>');
      fixture.componentRef.setInput('control', customControl);
      fixture.detectChanges();

      expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(
        '<p>Test content</p>',
      );
    });
  });

  describe('Form Control Integration', () => {
    let testControl: FormControl;

    beforeEach(() => {
      testControl = new FormControl('Initial value');
      fixture.componentRef.setInput('control', testControl);
      fixture.detectChanges();
    });

    it('should handle null values in form control', () => {
      mockSanitizer.bypassSecurityTrustHtml.calls.reset();
      testControl.setValue(null);
      fixture.detectChanges();

      expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('');
    });

    it('should update form control when content changes', () => {
      spyOn(component, 'updateContent').and.callThrough();

      // Mock the editor element
      const mockEditor = {
        innerHTML: '<p>Updated content</p>',
      } as HTMLDivElement;

      component.editor = {
        nativeElement: mockEditor,
      } as ElementRef<HTMLDivElement>;

      component.updateContent();

      expect(testControl.value).toBe('<p>Updated content</p>');
    });
  });

  describe('Editor Commands', () => {
    beforeEach(() => {
      fixture.detectChanges();
      spyOn(document, 'execCommand').and.returnValue(true);
      spyOn(component, 'updateContent');
    });

    it('should execute bold command', () => {
      component.execCommand('bold');

      expect(document.execCommand).toHaveBeenCalledWith(
        'bold',
        false,
        undefined,
      );
      expect(component.updateContent).toHaveBeenCalled();
    });

    it('should execute command with value', () => {
      component.execCommand('fontSize', '14px');

      expect(document.execCommand).toHaveBeenCalledWith(
        'fontSize',
        false,
        '14px',
      );
      expect(component.updateContent).toHaveBeenCalled();
    });

    it('should clear formatting', () => {
      component.clearFormatting();

      expect(document.execCommand).toHaveBeenCalledWith(
        'removeFormat',
        false,
        undefined,
      );
      expect(document.execCommand).toHaveBeenCalledWith(
        'unlink',
        false,
        undefined,
      );
    });
  });

  describe('Alignment Methods', () => {
    beforeEach(() => {
      fixture.detectChanges();
      spyOn(component, 'execCommand');
    });

    it('should apply left alignment', () => {
      component.applyAlignment('left');

      expect(component.execCommand).toHaveBeenCalledWith(
        'styleWithCSS',
        'true',
      );
      expect(component.execCommand).toHaveBeenCalledWith('justifyLeft');
    });

    it('should apply center alignment', () => {
      component.applyAlignment('center');

      expect(component.execCommand).toHaveBeenCalledWith(
        'styleWithCSS',
        'true',
      );
      expect(component.execCommand).toHaveBeenCalledWith('justifyCenter');
    });

    it('should apply right alignment', () => {
      component.applyAlignment('right');

      expect(component.execCommand).toHaveBeenCalledWith(
        'styleWithCSS',
        'true',
      );
      expect(component.execCommand).toHaveBeenCalledWith('justifyRight');
    });
  });

  describe('Prompt Handling', () => {
    let mockEvent: MouseEvent;

    beforeEach(() => {
      fixture.detectChanges();
      mockEvent = new MouseEvent('click');
      Object.defineProperty(mockEvent, 'currentTarget', {
        value: document.createElement('button'),
        writable: false,
      });

      // Mock window.getSelection
      const mockSelection = {
        getRangeAt: jasmine
          .createSpy('getRangeAt')
          .and.returnValue(new Range()),
      };
      spyOn(window, 'getSelection').and.returnValue(mockSelection as any);
    });

    it('should open link prompt', () => {
      component.openPrompt('link', mockEvent);

      expect(mockProjectionService.openContent).toHaveBeenCalled();
      expect(component.userSelection).toBeDefined();
    });

    it('should open image prompt', () => {
      component.openPrompt('image', mockEvent);

      expect(mockProjectionService.openContent).toHaveBeenCalled();
      expect(component.userSelection).toBeDefined();
    });

    it('should handle close prompt for link', () => {
      spyOn(component, 'insertLink');

      const values = {
        type: 'link',
        prompt_url: 'https://example.com',
      };

      component.handleClosePrompt(values);

      expect(component.insertLink).toHaveBeenCalledWith(values);
      expect(mockProjectionService.closeContent).toHaveBeenCalled();
    });

    it('should handle close prompt for image', () => {
      const values = {
        type: 'image',
        prompt_url: 'https://example.com/image.jpg',
      };

      component.handleClosePrompt(values);

      expect(mockProjectionService.closeContent).toHaveBeenCalled();
    });
  });

  describe('Link Insertion', () => {
    beforeEach(() => {
      fixture.detectChanges();
      spyOn(component, 'execCommand');
    });

    it('should not insert link without URL', () => {
      const values = { prompt_url: '' };

      component.insertLink(values);

      expect(component.execCommand).not.toHaveBeenCalled();
    });

    it('should not insert link without selection', () => {
      spyOn(window, 'getSelection').and.returnValue(null);

      const values = { prompt_url: 'https://example.com' };

      component.insertLink(values);

      expect(component.execCommand).not.toHaveBeenCalled();
    });
  });

  describe('Image Validation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should validate correct image URL', () => {
      const validUrl = 'https://example.com/image.jpg';
      const result = component.isValidImageUrl(validUrl);

      expect(result).toBe(true);
    });

    it('should reject invalid URL', () => {
      const invalidUrl = 'not-a-url';
      const result = component.isValidImageUrl(invalidUrl);

      expect(result).toBe(false);
    });

    it('should reject empty URL', () => {
      const result = component.isValidImageUrl('');

      expect(result).toBe(false);
    });
  });

  describe('Table Operations', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should open table dialog', () => {
      component.openTableDialog();

      expect(component.showTableDialog).toBe(true);
    });

    it('should close table dialog', () => {
      component.showTableDialog = true;
      component.closeTableDialog();

      expect(component.showTableDialog).toBe(false);
    });

    it('should generate table HTML', () => {
      const html = component.generateTableHtml(2, 3);

      expect(html).toContain('<table');
      expect(html).toContain('</table>');
      expect(html).toContain('<tr>');
      expect(html).toContain('<td');
      // Should have 2 rows * 3 columns = 6 td elements
      const tdCount = (html.match(/<td/g) || []).length;
      expect(tdCount).toBe(6);
    });

    it('should insert table when valid dimensions', () => {
      spyOn(component, 'insertHtml');
      spyOn(component, 'closeTableDialog');

      component.tableRows = 2;
      component.tableColumns = 3;

      component.insertTable();

      expect(component.insertHtml).toHaveBeenCalled();
      expect(component.closeTableDialog).toHaveBeenCalled();
    });
  });

  describe('Event Handlers', () => {
    beforeEach(() => {
      fixture.detectChanges();
      spyOn(component, 'execCommand');
    });

    it('should handle select change events', () => {
      const mockEvent = {
        target: { value: 'h1' },
      } as unknown as Event;

      component.handleChange(mockEvent, 'formatBlock');

      expect(component.execCommand).toHaveBeenCalledWith('formatBlock', 'h1');
    });

    it('should not execute command when no value', () => {
      const mockEvent = {
        target: { value: '' },
      } as unknown as Event;

      component.handleChange(mockEvent, 'formatBlock');

      expect(component.execCommand).not.toHaveBeenCalled();
    });
  });

  describe('Utility Methods', () => {
    beforeEach(() => {
      fixture.detectChanges();
      const mockEditor = {
        innerHTML: '<p>Current content</p>',
      } as HTMLDivElement;
      component.editor = {
        nativeElement: mockEditor,
      } as ElementRef<HTMLDivElement>;
    });

    it('should get current state', () => {
      const state = component.getCurrentState();

      expect(state).toBe(component.control().value);
    });

    it('should detect alignment from selection', () => {
      // Mock window.getSelection with a simple implementation
      const mockSelection = {
        rangeCount: 0,
        getRangeAt: jasmine.createSpy('getRangeAt'),
      };

      spyOn(window, 'getSelection').and.returnValue(mockSelection as any);

      component.detectAlignment();

      // Should maintain default alignment when no selection
      expect(component.currentAlignment).toBe('left');
    });
  });
});
