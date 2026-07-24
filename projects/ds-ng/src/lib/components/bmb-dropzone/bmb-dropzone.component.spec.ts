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
    fixture.detectChanges();
    const newFileSpy = spyOn(component.newFile, 'emit');
    const invalidFile = new File(['content'], 'reporte#final.pdf', {
      type: 'application/pdf',
    });

    (component as any).handleFileSelected({
      target: { files: [invalidFile], value: 'selected-file' },
    } as unknown as Event);
    fixture.detectChanges();

    expect(newFileSpy).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain(
      'Nombre de archivo no valido',
    );
  });

  it('should preserve the default behavior and ignore duplicate files', () => {
    fixture.detectChanges();
    const newFileSpy = spyOn(component.newFile, 'emit');
    const file = createPdfFile('archivo-valido.pdf');

    selectFiles([file, file]);

    expect(newFileSpy).toHaveBeenCalledOnceWith([file]);
  });

  it('should allow duplicate files when allowDuplicateFiles is true', () => {
    componentRef.setInput('allowDuplicateFiles', true);
    fixture.detectChanges();
    const newFileSpy = spyOn(component.newFile, 'emit');
    const file = createPdfFile('archivo-valido.pdf');

    selectFiles([file, file]);

    expect(newFileSpy).toHaveBeenCalledOnceWith([file, file]);
    expect(component.control().value).toEqual([
      'archivo-valido.pdf',
      'archivo-valido.pdf',
    ]);
  });

  it('should display multiple custom validation messages on separate lines', () => {
    const duplicateValidator: ValidatorFn = (
      control: AbstractControl,
    ): ValidationErrors | null => {
      const names = control.value as string[];
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

  function createPdfFile(name: string): File {
    return new File(['content'], name, { type: 'application/pdf' });
  }

  function selectFiles(files: File[]): void {
    (component as any).handleFileSelected({
      target: { files, value: 'selected-files' },
    } as unknown as Event);
    fixture.detectChanges();
  }
});
