import { BmbNotificationService, NotificationPositionX, NotificationPositionY } from './notification.service';
import { INotification } from '../../components/bmb-push-notification/types';

import { TestBed } from '@angular/core/testing';
import { RendererFactory2 } from '@angular/core';

describe('BmbNotificationService', () => {
  let service: BmbNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BmbNotificationService,
        { provide: RendererFactory2, useValue: {
          createRenderer: () => ({
            setProperty: () => {},
            setAttribute: () => {},
            removeAttribute: () => {},
            addClass: () => {},
            removeClass: () => {},
            setStyle: () => {},
            removeStyle: () => {},
            destroy: () => {},
            createElement: (name: string) => document.createElement(name),
            createComment: (text: string) => document.createComment(text),
            appendChild: () => {},
            removeChild: () => {},
            listen: () => () => {}, // Mock listen method
          })
        }},
        { provide: 'AppRef', useValue: { attachView: () => {}, components: [] } },
        { provide: 'EnvironmentInjector', useValue: {} }
      ]
    });
    service = TestBed.inject(BmbNotificationService);
    service.notificationList.set([]); // Reset state before each test
  });

  it('debe inicializar con la lista de notificaciones vacía', () => {
    expect(service.getNotificationList()).toEqual([]);
  });

  it('debe agregar una notificación y asignar un id si no existe', () => {
    const notification: INotification = { content: 'Test', component: 'toast', delay: 1000, title: 'Test Title', isFullColor: false };
    service.addNotification(notification);
    const list = service.getNotificationList();
    expect(list.length).toBe(1);
    expect(list[0].content).toBe('Test');
    expect(list[0].id).toBeDefined();
  });

  it('debe agregar una notificación y respetar el id proporcionado', () => {
    const notification: INotification = { id: 'custom-id', content: 'Test', component: 'toast', delay: 1000, title: 'Test Title', isFullColor: false };
    service.addNotification(notification);
    const list = service.getNotificationList();
    expect(list[0].id).toBe('custom-id');
  });

  it('should delete a notification by id (not toast)', () => {
    const notification: INotification = { id: 'note-id', content: 'Test', component: 'notification', delay: 1000, title: 'Test Title', isFullColor: false };
    service.addNotification(notification);
    expect(service.getNotificationList().length).toBe(1);
    service.deleteNotification('note-id');
    expect(service.getNotificationList().length).toBe(0);
  });

  it('debe marcar como closing y eliminar una notificación tipo toast', (done) => {
    const notification: INotification = { id: 'toast-id', content: 'Toast', component: 'toast', delay: 500, title: 'Toast Title', isFullColor: false };
    service.addNotification(notification);
    expect(service.getNotificationList().length).toBe(1);

    // Eliminar con delay
    service.deleteNotification('toast-id', 100);
    setTimeout(() => {
      const list = service.getNotificationList();
      expect(list.find(n => n.id === 'toast-id')).toBeUndefined();
      done();
    }, 150);
  });

  it('debe eliminar automáticamente la notificación después del delay', (done) => {
    const notification: INotification = { id: 'auto-id', content: 'Auto', component: 'notification', delay: 100, title: 'Auto Title', isFullColor: false };
    service.addNotification(notification);
    expect(service.getNotificationList().length).toBe(1);

    setTimeout(() => {
      expect(service.getNotificationList().length).toBe(0);
      done();
    }, 150);
  });
});
