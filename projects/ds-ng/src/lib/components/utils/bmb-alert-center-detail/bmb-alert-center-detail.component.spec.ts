import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAlertCenterDetailComponent } from './bmb-alert-center-detail.component';
import { ComponentRef } from '@angular/core';
import {
  IBmbDataAlert,
  IBmbDataAlertDetails,
} from '../../bmb-alert-center/types';
import DOMPurify from 'dompurify';
import { forbidTagsAndAttributes } from '../../../utils/utils';

describe('BmbAlertCenterDetailComponent', () => {
  let component: BmbAlertCenterDetailComponent;
  let fixture: ComponentFixture<BmbAlertCenterDetailComponent>;
  let componentRef: ComponentRef<BmbAlertCenterDetailComponent>;
  const _details: IBmbDataAlertDetails[] = [
    { text: '<h3>Test</h3>', type: 'title' },
  ];
  const _alert: IBmbDataAlert = {
    id: 'id_test',
    title: 'Test',
    description: _details,
    date: 'martes 19 noviembre 2024',
    isRead: false,
    time: '',
    type: 'normal',
    isFavorite: false,
    isArchived: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmbAlertCenterDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbAlertCenterDetailComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('alert', _alert);
    fixture.detectChanges();
  });
  it('should sanitize HTML with DOMPurify and then bypass Angular sanitizer', () => {
    const dirtyHtml = '<div><script>alert("x")</script><p>ok</p></div>';
    const cleanedHtml = '<div><p>ok</p></div>';

    spyOn(DOMPurify, 'sanitize' as any).and.returnValue(cleanedHtml);
    const sanitizerSpy = spyOn(
      (component as any).sanitizer,
      'bypassSecurityTrustHtml',
    ).and.callThrough();

    const result = component.sanitizedHtml(dirtyHtml);

    expect((DOMPurify as any).sanitize).toHaveBeenCalledWith(
      dirtyHtml,
      forbidTagsAndAttributes,
    );
    expect(sanitizerSpy).toHaveBeenCalledWith(cleanedHtml);
    expect(result).toBeDefined();
  });

  it('should emit alertEvent when handleAlertEvent is called', () => {
    const testAlert = { id: 'test-alert', title: 'Test' } as any;
    const emitSpy = spyOn(component.alertEvent, 'emit').and.callThrough();

    component.handleAlertEvent(testAlert);

    expect(emitSpy).toHaveBeenCalledWith(testAlert);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
