import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbSearchInputComponent } from 'ui-angular';

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

  handleValueChange(value: string): void {
    this.lastEvent.set(`onValueChange: ${value}`);
    console.log('onValueChange emitted to parent:', value);
  }

  handleServerSideFilterEvent(value: string): void {
    this.lastEvent.set(`onServerSideFilterEvent: ${value}`);
    this.simulateServerResults(value);
  }

  handleClearField(): void {
    this.lastEvent.set('onClearField emitido');
    this.serverSideFilteredData.set([]);
  }

  setSearchDebounceTime(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.searchDebounceTime.set(value);
  }

  private simulateServerResults(query: string): void {
    const matches = PEOPLE.filter((person) =>
      person.toLowerCase().includes(query.toLowerCase()),
    );
    this.serverSideFilteredData.set(matches);
  }
}
