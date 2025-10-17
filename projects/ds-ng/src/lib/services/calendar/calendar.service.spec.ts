import { BmbCalendarService } from './calendar.service';
import { IBmbCalendarEvent } from '../../components/bmb-calendar/types';

describe('BmbCalendarService', () => {
  let service: BmbCalendarService;

  beforeEach(() => {
    service = new BmbCalendarService();
    service.eventList.set([]); // Reset state before each test
    service.isLoading.set(false);
  });

  it('debe inicializar con lista de eventos vacía y isLoading en false', () => {
    expect(service.getEventList()).toEqual([]);
    expect(service.getIsLoading()).toBe(false);
  });

  it('debe agregar un evento y asignar un id si no existe', () => {
    const event: IBmbCalendarEvent = {
      title: 'Evento 1',
      start: '2025-10-15',
      end: '2025-10-16',
      id: undefined,
      detail: '',
      modalTitle: '',
    };
    service.addEvent(event);
    const events = service.getEventList();
    expect(events.length).toBe(1);
    expect(events[0].title).toBe('Evento 1');
    expect(events[0].id).toBeDefined();
  });

  it('debe agregar múltiples eventos y asignar ids únicos si no existen', () => {
    const events: IBmbCalendarEvent[] = [
      {
        title: 'Evento 1',
        start: '2025-10-15',
        end: '2025-10-16',
        id: undefined,
        detail: '',
        modalTitle: '',
      },
      {
        title: 'Evento 2',
        start: '2025-10-15',
        end: '2025-10-16',
        id: undefined,
        detail: '',
        modalTitle: '',
      },
    ];
    service.addMultipleEvents(events);
    const result = service.getEventList();
    expect(result.length).toBe(2);
    expect(result[0].id).toBeDefined();
    expect(result[1].id).toBeDefined();
    expect(result[0].id).not.toBe(result[1].id);
  });

  it('debe eliminar un evento por id', () => {
    const event: IBmbCalendarEvent = {
      title: 'Evento 1',
      start: '2025-10-15',
      end: '2025-10-16',
      id: 'test-id',
      detail: '',
      modalTitle: '',
    };
    service.addEvent(event);
    expect(service.getEventList().length).toBe(1);
    service.deleteEvent('test-id');
    expect(service.getEventList().length).toBe(0);
  });

  it('editEvent no debe modificar el evento (implementación actual)', () => {
    const event: IBmbCalendarEvent = {
      title: 'Evento 1',
      start: '2025-10-15',
      end: '2025-10-16',
      id: 'edit-id',
      detail: '',
      modalTitle: '',
    };
    service.addEvent(event);
    service.editEvent('edit-id');
    const events = service.getEventList();
    expect(events.length).toBe(1);
    expect(events[0]).toEqual(event);
  });

  it('debe actualizar y obtener el estado de isLoading', () => {
    service.setIsLoading(true);
    expect(service.getIsLoading()).toBe(true);
    service.setIsLoading(false);
    expect(service.getIsLoading()).toBe(false);
  });
});
