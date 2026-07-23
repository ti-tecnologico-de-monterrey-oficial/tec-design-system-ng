import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbDropzoneComponent } from './bmb-dropzone.component';
import { ComponentRef } from '@angular/core';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject a file with invalid characters and show its error message', () => {
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

  it('should reject the repeated file and show its duplicate error message', () => {
    const newFileSpy = spyOn(component.newFile, 'emit');
    const file = new File(['content'], 'archivo-valido.pdf', {
      type: 'application/pdf',
    });

    (component as any).handleFileSelected({
      target: { files: [file, file], value: 'selected-files' },
    } as unknown as Event);
    fixture.detectChanges();

    expect(newFileSpy).toHaveBeenCalledTimes(1);
    expect(newFileSpy).toHaveBeenCalledWith([file]);
    expect(fixture.nativeElement.textContent).toContain(
      'Archivo duplicado no valido',
    );
  });
});
