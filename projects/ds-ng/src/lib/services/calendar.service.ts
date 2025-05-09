import { Injectable, signal } from '@angular/core';
import { IBmbCalendarEvent } from '../components/bmb-calendar/types';
import { getUUID } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class BmbCalendarService {
  readonly eventList = signal<IBmbCalendarEvent[]>([]);
  readonly isLoading = signal<boolean>(false);

  addMultipleEvents(events: IBmbCalendarEvent[]) {
    const newEvents = events.map((event) => {
      const id = event.id ?? getUUID();
      return { ...event, id };
    });
    this.eventList.update((currentEvents) => [...currentEvents, ...newEvents]);
  }

  addEvent(event: IBmbCalendarEvent) {
    const id = event.id ?? getUUID();
    this.eventList.update((currentEvents) => [
      ...currentEvents,
      { ...event, id },
    ]);
  }

  deleteEvent(id: string) {
    this.eventList.update((currentEvents) =>
      currentEvents.filter((event) => event.id !== id),
    );
  }

  editEvent(id: string) {
    this.eventList.update((currentEvents) =>
      currentEvents.map((event) => {
        if (event.id !== id) return event;

        return event;
      }),
    );
  }

  getEventList() {
    return this.eventList();
  }

  setIsLoading(state: boolean) {
    this.isLoading.set(state);
  }

  getIsLoading() {
    return this.isLoading();
  }
}
