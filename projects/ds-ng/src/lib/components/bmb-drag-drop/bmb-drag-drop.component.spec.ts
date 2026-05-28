import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BmbDropzoneDirective } from './bmb-dropzone.directive';
import { BmbDragDropService } from './bmb-drag-drop.service';

@Component({
  standalone: true,
  imports: [BmbDropzoneDirective],
  template: `
    <div
      bmbDropzone
      (itemDropped)="onDrop($event)">
      Dropzone
    </div>
  `,
})
class TestHostComponent {
  droppedItem: any = null;

  onDrop(item: any) {
    this.droppedItem = item;
  }
}

describe('BmbDropzoneDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let service: BmbDragDropService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);

    component = fixture.componentInstance;

    service = TestBed.inject(BmbDragDropService);

    fixture.detectChanges();
  });

  it('should create directive', () => {
    const directive = fixture.debugElement.query(
      By.directive(BmbDropzoneDirective),
    );

    expect(directive).toBeTruthy();
  });

  it('should activate dropzone on dragover', () => {
    const element = fixture.debugElement.query(By.css('div'));

    const event = new DragEvent('dragover', {
      dataTransfer: new DataTransfer(),
    });

    element.triggerEventHandler('dragover', event);

    fixture.detectChanges();

    expect(element.nativeElement.classList).toContain(
      'bmb-dropzone-active',
    );
  });

  it('should remove active class on dragleave', () => {
    const element = fixture.debugElement.query(By.css('div'));

    element.triggerEventHandler('dragleave');

    fixture.detectChanges();

    expect(element.nativeElement.classList).not.toContain(
      'bmb-dropzone-active',
    );
  });

  it('should emit dropped item on drop', () => {
    const item = {
      id: 99,
      label: 'Dragged Item',
    };

    service.startDrag(item);

    const element = fixture.debugElement.query(By.css('div'));

    const event = new DragEvent('drop', {
      dataTransfer: new DataTransfer(),
    });

    element.triggerEventHandler('drop', event);

    fixture.detectChanges();

    expect(component.droppedItem).toEqual(item);
  });

  it('should clear drag state after drop', () => {
    spyOn(service, 'clearDrag').and.callThrough();

    service.startDrag({
      id: 1,
    });

    const element = fixture.debugElement.query(By.css('div'));

    const event = new DragEvent('drop', {
      dataTransfer: new DataTransfer(),
    });

    element.triggerEventHandler('drop', event);

    expect(service.clearDrag).toHaveBeenCalled();

    expect(service.draggedItem()).toBeNull();
  });
});