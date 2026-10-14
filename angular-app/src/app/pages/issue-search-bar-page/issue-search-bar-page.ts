import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BmbSearchInputComponent } from 'ui-angular';
import { EMPTY, Subject, timer } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';

const PEOPLE = [
  'David Medina',
  'David Cabrera Yáñez',
  'David Ríos Pérez',
  'David Villanueva',
  'David Pineda Quijano',
  'Daniela Villarreal González',
  'Daniel Martínez Trujillo',
  'Alan David Corvee',
];

@Component({
  selector: 'app-issue-search-bar-page',
  imports: [BmbSearchInputComponent],
  templateUrl: './issue-search-bar-page.html',
  styleUrl: './issue-search-bar-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueSearchBarPage {
  readonly data = signal<string[]>(PEOPLE);
  readonly placeholder = signal('Busca una persona por nombre...');
  readonly isLoading = signal(false);
  readonly isServerSideFilter = signal(false);
  readonly searchDebounceTime = signal(300);
  readonly serverSideFilteredData = signal<string[]>([]);
  readonly lastEvent = signal('Sin interacciones');

  private readonly destroyRef = inject(DestroyRef);
  private readonly searchQueries$ = new Subject<string>();
  private readonly searchApi = {
    search: (query: string) =>
      timer(400).pipe(
        map(() =>
          PEOPLE.filter((person) =>
            person.toLowerCase().includes(query.toLowerCase()),
          ),
        ),
      ),
  };

  constructor() {
    this.searchQueries$
      .pipe(
        switchMap((query) => {
          if (!query) return EMPTY;

          return timer(this.searchDebounceTime()).pipe(
            switchMap(() => {
              this.isLoading.set(true);

              return this.searchApi.search(query).pipe(
                tap((results) => this.serverSideFilteredData.set(results)),
                finalize(() => this.isLoading.set(false)),
              );
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  handleValueChange(value: string): void {
    this.lastEvent.set(`onValueChange: ${value}`);
    console.log('onValueChange emitted to parent:', value);
  }

  handleServerSideFilterEvent(value: string): void {
    this.lastEvent.set(`onServerSideFilterEvent: ${value}`);
    this.searchQueries$.next(value);
  }

  handleClearField(): void {
    this.lastEvent.set('onClearField emitido');
    this.searchQueries$.next('');
    this.serverSideFilteredData.set([]);
  }

  setSearchDebounceTime(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.searchDebounceTime.set(value);
  }

}
