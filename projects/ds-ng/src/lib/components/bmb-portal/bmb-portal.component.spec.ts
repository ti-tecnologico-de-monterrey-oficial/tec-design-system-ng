import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, Type } from '@angular/core';

import { BmbPortalComponent } from './bmb-portal.component';
import { BmbNotificationService } from '../../services/notification/notification.service';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../services/projection/projection.service';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import { IBmbNativeModal } from '../bmb-modal/bmb-modal.interface';
import { INotification } from '../bmb-push-notification/types';
import { BmbPushNotificationItemComponent } from '../bmb-push-notification/bmb-push-notification-item/bmb-push-notification-item.component';
import { BmbToastComponent } from '../bmb-toast/bmb-toast.component';
import { BmbNoticeCardComponent } from '../bmb-notice-card/bmb-notice-card.component';
import { BmbNativeModalComponent } from '../bmb-modal/bmb-native-modal.component';
import { BmbProjectedContentComponent } from './bmb-projected-content/bmb-projected-content.component';

@Component({
  selector: 'bmb-push-notification-item',
  standalone: true,
  template: '',
})
class MockPushNotificationItemComponent {
  @Input() notification: unknown;
  @Output() onClose = new EventEmitter<void>();
}

@Component({
  selector: 'bmb-toast',
  standalone: true,
  template: '',
})
class MockToastComponent {
  @Input() componentTitle = '';
  @Input() description: unknown;
  @Input() appearance = 'neutral';
  @Input() isClosable = true;
  @Input() id = '';
  @Output() onClose = new EventEmitter<void>();
}

@Component({
  selector: 'bmb-notice-card',
  standalone: true,
  template: '',
})
class MockNoticeCardComponent {
  @Input() src?: string;
  @Input() componentTitle = '';
  @Input() description: unknown;
  @Input() buttonText?: string;
  @Input() link?: string;
  @Output() onClose = new EventEmitter<void>();
}

@Component({
  selector: 'bmb-native-modal',
  standalone: true,
  template: '',
})
class MockNativeModalComponent {
  @Input() componentTitle = '';
  @Input() subtitle = '';
  @Input() content: string | TemplateRef<any> | null | Type<any> = '';
  @Input() actions: unknown[] = [];
  @Input() modalId = '';
  @Input() size: unknown;
  @Input() iconStyle: unknown;
  @Input() inputContext: Record<string, unknown> = {};
  @Input() outputContext: Record<string, (value: unknown) => void> = {};
  @Output() closeModalClicked = new EventEmitter<{
    modalId: string;
    event: MouseEvent;
  }>();
}

@Component({
  selector: 'bmb-projected-content',
  standalone: true,
  template: '',
})
class MockProjectedContentComponent {
  @Input() id: string | null = null;
  @Input() content: TemplateRef<any> | null | Type<any> = null;
  @Input() htmlRef: HTMLElement | null = null;
  @Input() mode: unknown;
  @Input() fixSizeToRef = false;
  @Input() inputContext: Record<string, unknown> = {};
  @Input() showBackdrop = true;
  @Input() outputContext: Record<string, (value: unknown) => void> = {};
  @Input() focusOnOpen = true;
  @Input() dialogClass: string | string[] | Record<string, boolean> = '';
  @Input() forceMobileCenter = false;
  @Output() removeContent = new EventEmitter<void>();
}

describe('BmbPortalComponent', () => {
  let component: BmbPortalComponent;
  let fixture: ComponentFixture<BmbPortalComponent>;
  let notifications: ReturnType<typeof signal<INotification[]>>;
  let modals: ReturnType<typeof signal<IBmbNativeModal[]>>;
  let projectedContents: ReturnType<typeof signal<IBmbProjectionContent[]>>;

  let notificationServiceMock: {
    getNotificationList: jasmine.Spy;
    deleteNotification: jasmine.Spy;
  };

  let projectionServiceMock: {
    getAllProjectedContents: jasmine.Spy;
    closeContent: jasmine.Spy;
    isContentOpen: jasmine.Spy;
  };

  let modalServiceMock: {
    modals: ReturnType<typeof signal<IBmbNativeModal[]>>;
  };

  beforeEach(async () => {
    notifications = signal<INotification[]>([]);
    modals = signal<IBmbNativeModal[]>([]);
    projectedContents = signal<IBmbProjectionContent[]>([]);

    notificationServiceMock = {
      getNotificationList: jasmine
        .createSpy('getNotificationList')
        .and.callFake(() => notifications()),
      deleteNotification: jasmine.createSpy('deleteNotification'),
    };

    projectionServiceMock = {
      getAllProjectedContents: jasmine
        .createSpy('getAllProjectedContents')
        .and.callFake(() => projectedContents()),
      closeContent: jasmine.createSpy('closeContent'),
      isContentOpen: jasmine.createSpy('isContentOpen').and.returnValue(false),
    };

    modalServiceMock = {
      modals,
    };

    TestBed.overrideComponent(BmbPortalComponent, {
      remove: {
        imports: [
          BmbPushNotificationItemComponent,
          BmbToastComponent,
          BmbNoticeCardComponent,
          BmbNativeModalComponent,
          BmbProjectedContentComponent,
        ],
      },
      add: {
        imports: [
          MockPushNotificationItemComponent,
          MockToastComponent,
          MockNoticeCardComponent,
          MockNativeModalComponent,
          MockProjectedContentComponent,
        ],
      },
    });

    await TestBed.configureTestingModule({
      imports: [BmbPortalComponent],
      providers: [
        { provide: BmbNotificationService, useValue: notificationServiceMock },
        {
          provide: BmbProjectionContentService,
          useValue: projectionServiceMock,
        },
        { provide: BmbNativeModalService, useValue: modalServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BmbPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose modals from modal service signal', () => {
    modals.set([
      {
        modalId: 'modal-1',
        title: 'Modal 1',
        content: 'Content',
      },
    ]);

    expect(component.modalSignal().length).toBe(1);
    expect(component.modalSignal()[0].modalId).toBe('modal-1');
  });

  it('should delete notification when id exists', () => {
    component.closeNotification({
      title: 'Toast',
      content: 'Body',
      isFullColor: false,
      id: 'notification-1',
    });

    expect(notificationServiceMock.deleteNotification).toHaveBeenCalledWith(
      'notification-1',
    );
  });

  it('should not delete notification when id is missing', () => {
    component.closeNotification({
      title: 'Toast',
      content: 'Body',
      isFullColor: false,
    });

    expect(notificationServiceMock.deleteNotification).not.toHaveBeenCalled();
  });

  it('should execute modal close callback with portal payload', () => {
    const callback = jasmine.createSpy('closeModalClicked');
    const modal: IBmbNativeModal = {
      modalId: 'modal-2',
      title: 'Modal 2',
      content: 'Body',
      closeModalClicked: callback,
    };
    const closeEvent = {
      modalId: 'modal-2',
      event: new MouseEvent('click'),
    };

    component.handleModalClick(modal, closeEvent);

    expect(callback).toHaveBeenCalledWith({ item: modal, event: closeEvent });
  });

  it('should close all projected content when id is not provided', () => {
    component.handleRemoveProjectedContent();

    expect(projectionServiceMock.closeContent).toHaveBeenCalledWith();
  });

  it('should close projected content only when id is open', () => {
    projectionServiceMock.isContentOpen.and.returnValue(true);

    component.handleRemoveProjectedContent('dialog-1');

    expect(projectionServiceMock.isContentOpen).toHaveBeenCalledWith(
      'dialog-1',
    );
    expect(projectionServiceMock.closeContent).toHaveBeenCalledWith('dialog-1');
  });

  it('should expose toast state as computed signal', () => {
    notifications.set([
      {
        title: 'Toast active',
        content: 'Body',
        isFullColor: false,
        component: 'toast',
      },
    ]);

    expect(component.hasToast()).toBeTrue();
  });

  it('should render accessibility attributes for notification region', () => {
    const portalRegion: HTMLElement =
      fixture.nativeElement.querySelector('.bmb_portal');

    expect(portalRegion.getAttribute('role')).toBe('region');
    expect(portalRegion.getAttribute('aria-label')).toBe('Notification portal');
    expect(portalRegion.getAttribute('aria-live')).toBe('polite');
    expect(portalRegion.getAttribute('aria-atomic')).toBe('false');
    expect(portalRegion.getAttribute('aria-relevant')).toBe(
      'additions removals text',
    );
  });

  it('should render only positions with notifications', () => {
    notifications.set([]);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.bmb_portal-top-left'),
    ).toBeNull();

    notifications.set([
      {
        title: 'Top left alert',
        content: 'Body',
        isFullColor: false,
        position: 'top-left',
      },
    ]);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.bmb_portal-top-left'),
    ).not.toBeNull();
    expect(
      fixture.nativeElement.querySelector('.bmb_portal-bottom-right'),
    ).toBeNull();
  });
});
