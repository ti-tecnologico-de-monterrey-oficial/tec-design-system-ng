import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbDropzoneComponent } from './bmb-dropzone.component';
import { ComponentRef } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

describe('DropzoneComponent', () => {
  let component: BmbDropzoneComponent;
  let fixture: ComponentFixture<BmbDropzoneComponent>;
  let componentRef: ComponentRef<BmbDropzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbDropzoneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbDropzoneComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('acceptedExtensions', ['pdf']);
    componentRef.setInput('multiple', true);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should reject a file with invalid characters and show its error message', () => {
    const nameValidator: ValidatorFn = (
      control: AbstractControl,
    ): ValidationErrors | null => {
      const names = (
        Array.isArray(control.value) ? control.value : [control.value]
      ).filter(Boolean);
      return names.some((name: string) => !/^[a-zA-Z0-9._-]+$/.test(name))
        ? { invalidName: true }
        : null;
    };
    componentRef.setInput('customValidation', [nameValidator]);
    componentRef.setInput('customErrorMessages', {
      invalidName: 'Nombre de archivo no valido',
    });
    fixture.detectChanges();
    const invalidFile = new File(['content'], 'reporte#final.pdf', {
      type: 'application/pdf',
    });

    selectFiles([invalidFile]);

    expect(fixture.nativeElement.textContent).toContain(
      'Nombre de archivo no valido',
    );
  });

  it('should preserve the default behavior and ignore duplicate files', () => {
    fixture.detectChanges();
    const newFileSpy = jest.spyOn(component.newFile, 'emit');
    const file = createPdfFile('archivo-valido.pdf');

    selectFiles([file, file]);

    expect(newFileSpy).toHaveBeenCalledTimes(1);
    expect(newFileSpy).toHaveBeenCalledWith([file]);
  });

  it('should allow duplicate files when allowDuplicateFiles is true', () => {
    componentRef.setInput('allowDuplicateFiles', true);
    fixture.detectChanges();
    const newFileSpy = jest.spyOn(component.newFile, 'emit');
    const file = createPdfFile('archivo-valido.pdf');

    selectFiles([file, file]);

    expect(newFileSpy).toHaveBeenCalledTimes(1);
    expect(newFileSpy).toHaveBeenCalledWith([file, file]);
    expect(component.control().value).toEqual([
      'archivo-valido.pdf',
      'archivo-valido.pdf',
    ]);
  });

  it('should display multiple custom validation messages on separate lines', () => {
    const duplicateValidator: ValidatorFn = (
      control: AbstractControl,
    ): ValidationErrors | null => {
      const names = (
        Array.isArray(control.value) ? control.value : [control.value]
      ).filter(Boolean);
      return new Set(names).size !== names.length
        ? { duplicateFileName: true }
        : null;
    };
    const reviewValidator: ValidatorFn = (): ValidationErrors => ({
      reviewRequired: true,
    });

    componentRef.setInput('allowDuplicateFiles', true);
    componentRef.setInput('customValidation', [
      duplicateValidator,
      reviewValidator,
    ]);
    componentRef.setInput('customErrorMessages', {
      duplicateFileName: 'Archivo duplicado no válido',
      reviewRequired: 'Los archivos requieren revisión manual',
    });
    fixture.detectChanges();

    const file = createPdfFile('archivo-valido.pdf');
    selectFiles([file, file]);
    fixture.detectChanges();

    const errorMessages = Array.from(
      fixture.nativeElement.querySelectorAll('.bmb_drop-zone-label-error'),
    ).map((element: unknown) => (element as HTMLElement).textContent?.trim());

    expect(errorMessages).toEqual([
      'Archivo duplicado no válido',
      'Los archivos requieren revisión manual',
    ]);
  });

  it('should display the completed file size in MB', () => {
    const file = createPdfFileWithSize('archivo-2mb.pdf', 2 * 1024 * 1024);
    componentRef.setInput('progress', { [file.name]: 100 });
    fixture.detectChanges();

    selectFiles([file]);

    expect(fixture.nativeElement.textContent).toContain('2.00MB');
  });

  it('should display the completed file size in KB when it is under 1 MB', () => {
    const file = createPdfFileWithSize('archivo-512kb.pdf', 512 * 1024);
    componentRef.setInput('progress', { [file.name]: 100 });
    fixture.detectChanges();

    selectFiles([file]);

    expect(fixture.nativeElement.textContent).toContain('512.00KB');
  });

  it('should patch a single value and emit the file when multiple is false', () => {
    componentRef.setInput('multiple', false);
    fixture.detectChanges();
    const newFileSpy = jest.spyOn(component.newFile, 'emit');
    const file = createPdfFile('single-file.pdf');

    selectFiles([file]);

    expect(newFileSpy).toHaveBeenCalledWith(file);
    expect(component.control().value).toBe('single-file.pdf');
  });

  describe('drag and drop handlers', () => {
    it('should add the uploading class on drag over', () => {
      fixture.detectChanges();
      const element = document.createElement('div');
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        currentTarget: element,
      } as unknown as DragEvent;

      component['handleDragOver'](event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(
        element.classList.contains('bmb_drop-zone-container-uploading-file'),
      ).toBe(true);
    });

    it('should remove the uploading class on drag leave', () => {
      fixture.detectChanges();
      const element = document.createElement('div');
      element.classList.add('bmb_drop-zone-container-uploading-file');
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        currentTarget: element,
      } as unknown as DragEvent;

      component['handleDragLeave'](event);

      expect(
        element.classList.contains('bmb_drop-zone-container-uploading-file'),
      ).toBe(false);
    });

    it('should validate the dropped files', () => {
      fixture.detectChanges();
      const newFileSpy = jest.spyOn(component.newFile, 'emit');
      const file = createPdfFile('dropped-file.pdf');
      const element = document.createElement('div');
      const dataTransfer = { files: [file] } as unknown as DataTransfer;
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        currentTarget: element,
        dataTransfer,
      } as unknown as DragEvent;

      component['handleDrop'](event);

      expect(newFileSpy).toHaveBeenCalledWith([file]);
    });

    it('should do nothing when there are no dropped files', () => {
      fixture.detectChanges();
      const newFileSpy = jest.spyOn(component.newFile, 'emit');
      const element = document.createElement('div');
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        currentTarget: element,
        dataTransfer: { files: [] } as unknown as DataTransfer,
      } as unknown as DragEvent;

      component['handleDrop'](event);

      expect(newFileSpy).not.toHaveBeenCalled();
    });
  });

  describe('handleRemoveFile', () => {
    it('should remove a file and update the control in multiple mode', () => {
      fixture.detectChanges();
      const file = createPdfFile('to-remove.pdf');
      selectFiles([file]);
      const removedSpy = jest.spyOn(component.fileRemoved, 'emit');
      const fileData = component.fileDataList[0];

      component['handleRemoveFile'](fileData);

      expect(component.fileDataList).toEqual([]);
      expect(component.control().value).toEqual([]);
      expect(removedSpy).toHaveBeenCalledWith('to-remove.pdf');
    });

    it('should clear the control in single mode when the removed file matches', () => {
      componentRef.setInput('multiple', false);
      fixture.detectChanges();
      const file = createPdfFile('single.pdf');
      selectFiles([file]);
      const fileData = component.fileDataList[0];

      component['handleRemoveFile'](fileData);

      expect(component.control().value).toBeNull();
    });
  });

  it('should show the format error message for a rejected file type', () => {
    fixture.detectChanges();
    const file = new File(['content'], 'image.png', { type: 'image/png' });

    selectFiles([file]);

    const errorMessage = fixture.nativeElement.querySelector(
      '.bmb_drop-zone-label-error',
    );
    expect(errorMessage?.textContent).toContain('*');
  });

  it('should show the size error message for an oversized file', () => {
    componentRef.setInput('fileSize', 1);
    fixture.detectChanges();
    const file = createPdfFileWithSize('too-big.pdf', 2 * 1024 * 1024);

    selectFiles([file]);

    const errorMessage = fixture.nativeElement.querySelector(
      '.bmb_drop-zone-label-error',
    );
    expect(errorMessage?.textContent).toContain('1 MB');
  });

  it('should run handleValidity without throwing', () => {
    fixture.detectChanges();
    expect(() => component.handleValidity()).not.toThrow();
  });

  describe('reset', () => {
    it('should clear the file list and reset the control', () => {
      fixture.detectChanges();
      const file = createPdfFile('to-reset.pdf');
      selectFiles([file]);

      component.reset();

      expect(component.fileDataList).toEqual([]);
      expect(component.control().value).toEqual([null]);
    });
  });

  function createPdfFile(name: string): File {
    return new File(['content'], name, { type: 'application/pdf' });
  }

  function createPdfFileWithSize(name: string, size: number): File {
    return new File([new Uint8Array(size)], name, {
      type: 'application/pdf',
    });
  }

  function selectFiles(files: File[]): void {
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="file"]');
    Object.defineProperty(input, 'files', {
      configurable: true,
      value: files,
    });
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  }
});
