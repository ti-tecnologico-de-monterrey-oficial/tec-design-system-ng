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
});
