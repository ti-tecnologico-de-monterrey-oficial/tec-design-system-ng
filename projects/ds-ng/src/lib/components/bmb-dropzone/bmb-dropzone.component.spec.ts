import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbDropzoneComponent } from './bmb-dropzone.component';

describe('DropzoneComponent', () => {
  let component: BmbDropzoneComponent;
  let fixture: ComponentFixture<BmbDropzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbDropzoneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
