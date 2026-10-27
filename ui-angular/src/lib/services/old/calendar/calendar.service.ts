import {
  appendItems,
  removeItemBy,
  patchItemBy,
} from '../../../_shared/logic/services/collections';
import { Injectable, signal } from '@angular/core';
import { getUUID } from '../../../_shared/logic/utils';
import type { IBmbCalendarEvent } from '../../../_shared/types/components/calendar';

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
    this.eventList.update((currentEvents) =>
      appendItems(currentEvents, newEvents),
    );
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
      removeItemBy(currentEvents, 'id', id),
    );
  }

  editEvent(id: string, newEventData: Partial<IBmbCalendarEvent>) {
    this.eventList.update((currentEvents) =>
      patchItemBy(currentEvents, 'id', id, newEventData),
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
