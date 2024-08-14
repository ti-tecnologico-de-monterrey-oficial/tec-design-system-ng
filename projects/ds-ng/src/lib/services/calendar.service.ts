import { Injectable, signal } from '@angular/core';
import { IBmbCalendarEvent } from '../components/bmb-calendar/types';

@Injectable({
  providedIn: 'root',
})
export class BmbCalendarService {
  readonly eventList = signal<IBmbCalendarEvent[]>([]);
  readonly isLoading = signal<boolean>(false);

  addevent(event: IBmbCalendarEvent) {
    const id = event.id ?? self.crypto.randomUUID();
    this.eventList.update((currentevents) => [
      ...currentevents,
      { ...event, id },
    ]);
  }

  deleteevent(id: string) {
    this.eventList.update((currentevents) =>
      currentevents.filter((event) => event.id !== id),
    );
  }

  editevent(id: string) {
    this.eventList.update((currentevents) =>
      currentevents.map((event) => {
        if (event.id !== id) return event;

        return event;
      }),
    );
  }

  geteventList() {
    return this.eventList();
  }

  setIsLoading(state: boolean) {
    this.isLoading.set(state);
  }

  getIsLoading() {
    return this.isLoading();
  }
}
