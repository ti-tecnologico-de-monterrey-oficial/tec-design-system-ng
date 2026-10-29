import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmbPortalComponent } from './bmb-portal.component';
import { BmbNativeModalService } from '../../services/old/modal/native-modal.service';
import { BmbProjectionContentService } from '../../services/old/projection/projection.service';
import { BmbNotificationService } from '../../services/old/notification/notification.service';

describe('BmbPortalComponent', () => {
  describe('sin modales ni contenido proyectado', () => {
    let fixture: ComponentFixture<BmbPortalComponent>;
    let modalServiceMock: jasmine.SpyObj<BmbNativeModalService>;
    let projectionServiceMock: jasmine.SpyObj<BmbProjectionContentService>;
    let notificationServiceMock: jasmine.SpyObj<BmbNotificationService>;

    beforeEach(async () => {
      modalServiceMock = jasmine.createSpyObj<BmbNativeModalService>(
        'BmbNativeModalService',
        ['getModalList', 'closeAllModals', 'closeModal'],
      );
      projectionServiceMock =
        jasmine.createSpyObj<BmbProjectionContentService>(
          'BmbProjectionContentService',
          ['getAllProjectedContents', 'closeContent'],
        );
      notificationServiceMock = jasmine.createSpyObj<BmbNotificationService>(
        'BmbNotificationService',
        ['getNotificationList'],
      );

      modalServiceMock.getModalList.and.returnValue([]);
      projectionServiceMock.getAllProjectedContents.and.returnValue([]);
      notificationServiceMock.getNotificationList.and.returnValue([]);

      await TestBed.configureTestingModule({
        imports: [BmbPortalComponent],
        providers: [
          { provide: BmbNativeModalService, useValue: modalServiceMock },
          {
            provide: BmbProjectionContentService,
            useValue: projectionServiceMock,
          },
          { provide: BmbNotificationService, useValue: notificationServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(BmbPortalComponent);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('no debe cerrar nada al hacer popstate', () => {
      window.dispatchEvent(new Event('popstate'));

      expect(modalServiceMock.closeAllModals).not.toHaveBeenCalled();
      expect(projectionServiceMock.closeContent).not.toHaveBeenCalled();
    });
  });

  describe('con modales y contenido proyectado', () => {
    let fixture: ComponentFixture<BmbPortalComponent>;
    let modalServiceMock: jasmine.SpyObj<BmbNativeModalService>;
    let projectionServiceMock: jasmine.SpyObj<BmbProjectionContentService>;
    let notificationServiceMock: jasmine.SpyObj<BmbNotificationService>;

    beforeEach(async () => {
      modalServiceMock = jasmine.createSpyObj<BmbNativeModalService>(
        'BmbNativeModalService',
        ['getModalList', 'closeAllModals', 'closeModal'],
      );
      projectionServiceMock =
        jasmine.createSpyObj<BmbProjectionContentService>(
          'BmbProjectionContentService',
          ['getAllProjectedContents', 'closeContent'],
        );
      notificationServiceMock = jasmine.createSpyObj<BmbNotificationService>(
        'BmbNotificationService',
        ['getNotificationList'],
      );

      modalServiceMock.getModalList.and.returnValue([{ modalId: 'm1' }]);
      projectionServiceMock.getAllProjectedContents.and.returnValue([
        { id: 'c1', content: null },
      ]);
      notificationServiceMock.getNotificationList.and.returnValue([]);

      await TestBed.configureTestingModule({
        imports: [BmbPortalComponent],
        providers: [
          { provide: BmbNativeModalService, useValue: modalServiceMock },
          {
            provide: BmbProjectionContentService,
            useValue: projectionServiceMock,
          },
          { provide: BmbNotificationService, useValue: notificationServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(BmbPortalComponent);
      fixture.detectChanges();
    });

    it('debe cerrar modales y contenido proyectado al hacer popstate', () => {
      window.dispatchEvent(new Event('popstate'));

      expect(modalServiceMock.closeAllModals).toHaveBeenCalled();
      expect(projectionServiceMock.closeContent).toHaveBeenCalled();
    });
  });

  describe('métodos auxiliares', () => {
    let fixture: ComponentFixture<BmbPortalComponent>;
    let modalServiceMock: jasmine.SpyObj<BmbNativeModalService>;
    let projectionServiceMock: jasmine.SpyObj<BmbProjectionContentService>;
    let notificationServiceMock: jasmine.SpyObj<BmbNotificationService>;

    beforeEach(async () => {
      modalServiceMock = jasmine.createSpyObj<BmbNativeModalService>(
        'BmbNativeModalService',
        ['getModalList', 'closeAllModals', 'closeModal'],
      );
      projectionServiceMock =
        jasmine.createSpyObj<BmbProjectionContentService>(
          'BmbProjectionContentService',
          ['getAllProjectedContents', 'closeContent', 'isContentOpen'],
        );
      notificationServiceMock = jasmine.createSpyObj<BmbNotificationService>(
        'BmbNotificationService',
        ['getNotificationList', 'deleteNotification'],
      );

      modalServiceMock.getModalList.and.returnValue([]);
      projectionServiceMock.getAllProjectedContents.and.returnValue([]);
      notificationServiceMock.getNotificationList.and.returnValue([
        { id: '1', component: 'toast' },
        { id: '2', component: 'card' },
      ]);

      await TestBed.configureTestingModule({
        imports: [BmbPortalComponent],
        providers: [
          { provide: BmbNativeModalService, useValue: modalServiceMock },
          {
            provide: BmbProjectionContentService,
            useValue: projectionServiceMock,
          },
          { provide: BmbNotificationService, useValue: notificationServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(BmbPortalComponent);
      fixture.detectChanges();
    });

    it('hasToast debe ser true cuando hay una notificación tipo toast', () => {
      expect(fixture.componentInstance.hasToast()).toBe(true);
    });

    it('hasToast debe ser false cuando no hay notificaciones tipo toast', async () => {
      const noToastNotificationServiceMock =
        jasmine.createSpyObj<BmbNotificationService>(
          'BmbNotificationService',
          ['getNotificationList', 'deleteNotification'],
        );
      noToastNotificationServiceMock.getNotificationList.and.returnValue([
        { id: '2', component: 'card' },
      ]);

      await TestBed.resetTestingModule()
        .configureTestingModule({
          imports: [BmbPortalComponent],
          providers: [
            { provide: BmbNativeModalService, useValue: modalServiceMock },
            {
              provide: BmbProjectionContentService,
              useValue: projectionServiceMock,
            },
            {
              provide: BmbNotificationService,
              useValue: noToastNotificationServiceMock,
            },
          ],
        })
        .compileComponents();

      const noToastFixture = TestBed.createComponent(BmbPortalComponent);
      noToastFixture.detectChanges();

      expect(noToastFixture.componentInstance.hasToast()).toBe(false);
    });

    it('closeNotification debe eliminar la notificación cuando tiene id', () => {
      fixture.componentInstance.closeNotification({ id: '1' } as any);
      expect(notificationServiceMock.deleteNotification).toHaveBeenCalledWith(
        '1',
      );
    });

    it('closeNotification no debe hacer nada sin id', () => {
      fixture.componentInstance.closeNotification({} as any);
      expect(
        notificationServiceMock.deleteNotification,
      ).not.toHaveBeenCalled();
    });

    it('handleModalClick debe invocar closeModalClicked cuando existe', () => {
      const closeModalClicked = jest.fn();
      fixture.componentInstance.handleModalClick(
        { closeModalClicked } as any,
        'event',
      );
      expect(closeModalClicked).toHaveBeenCalled();
    });

    it('handleModalClick no debe lanzar error cuando closeModalClicked no existe', () => {
      expect(() =>
        fixture.componentInstance.handleModalClick({} as any, 'event'),
      ).not.toThrow();
    });

    it('handleRemoveProjectedContent debe cerrar todo el contenido sin id', () => {
      fixture.componentInstance.handleRemoveProjectedContent();
      expect(projectionServiceMock.closeContent).toHaveBeenCalledWith();
    });

    it('handleRemoveProjectedContent debe cerrar el contenido abierto con id', () => {
      projectionServiceMock.isContentOpen.and.returnValue(true);
      fixture.componentInstance.handleRemoveProjectedContent('c1');
      expect(projectionServiceMock.closeContent).toHaveBeenCalledWith('c1');
    });

    it('handleRemoveProjectedContent no debe cerrar contenido que no está abierto', () => {
      projectionServiceMock.isContentOpen.and.returnValue(false);
      fixture.componentInstance.handleRemoveProjectedContent('c1');
      expect(projectionServiceMock.closeContent).not.toHaveBeenCalled();
    });

    it('trackByDialogId debe retornar el id del diálogo', () => {
      expect(
        fixture.componentInstance.trackByDialogId(0, { id: 'd1' } as any),
      ).toBe('d1');
    });
  });
});
