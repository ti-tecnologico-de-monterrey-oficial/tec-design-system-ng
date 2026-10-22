import { NgComponentOutlet } from '@angular/common';
import { afterEveryRender, ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, output, reflectComponentType, signal, Type, viewChild } from '@angular/core';
import { demoDrafts, DemoConfiguration, DemoValue, parseDemoProperties, serializeDemoValue } from './demo-properties';

@Component({
  selector: 'app-property-playground',
  imports: [NgComponentOutlet],
  templateUrl: './property-playground.html',
  styleUrl: './property-playground.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyPlayground implements OnInit {
  readonly component = input.required<Type<unknown>>();
  readonly configuration = input.required<DemoConfiguration>();
  readonly propertiesApplied = output<Record<string, DemoValue>>();
  readonly drafts = signal<Record<string, string | boolean>>({});
  readonly applied = signal<Record<string, unknown>>({});
  readonly revision = signal(0);
  readonly ready = signal(false);
  readonly error = signal('');
  readonly events = signal<{ name: string; payload: string }[]>([]);
  readonly outputNames = signal<string[]>([]);
  readonly outlet = viewChild(NgComponentOutlet);
  private instance: unknown;
  private subscriptions: { unsubscribe(): void }[] = [];

  constructor() {
    afterEveryRender(() => this.connectOutputs());
    inject(DestroyRef).onDestroy(() => this.disconnect());
  }

  ngOnInit(): void {
    const metadata = reflectComponentType(this.component());
    const configured = new Set(
      this.configuration()
        .properties.filter((p) => !p.service)
        .map((p) => p.name),
    );
    const missing =
      metadata?.inputs.filter((p) => !configured.has(p.templateName)) ?? [];
    if (missing.length)
      throw new Error(
        'Missing property controls: ' +
          missing.map((p) => p.templateName).join(', '),
      );
    this.outputNames.set(metadata?.outputs.map((p) => p.templateName) ?? []);
    this.reset();
  }

  setDraft(name: string, value: string | boolean, refresh = true): void {
    this.drafts.update((drafts) => ({ ...drafts, [name]: value }));
    if (refresh) this.apply();
  }

  reset(): void {
    this.drafts.set(demoDrafts(this.configuration()));
    this.events.set([]);
    this.apply();
  }

  apply(): void {
    try {
      const parsed = parseDemoProperties(
        this.configuration().properties,
        this.drafts(),
      );
      const values = this.withCallbacks(parsed);
      this.propertiesApplied.emit(values);
      this.applied.set(
        Object.fromEntries(
          this.configuration()
            .properties.filter((p) => !p.service)
            .map((p) => [p.name, values[p.name]]),
        ),
      );
      this.error.set('');
      this.revision.update((value) => value + 1);
      this.ready.set(true);
    } catch (error) {
      this.error.set(
        error instanceof Error ? error.message : 'Invalid properties.',
      );
    }
  }

  record(name: string, payload: unknown): void {
    this.events.update((events) =>
      [{ name, payload: serializeDemoValue(payload) }, ...events].slice(0, 20),
    );
  }

  private withCallbacks(
    values: Record<string, DemoValue>,
  ): Record<string, DemoValue> {
    // JSON describes callback-bearing data; callbacks remain executable in the demo.
    if (Array.isArray(values['actionsList']))
      values['actionsList'] = values['actionsList'].map(
        (action: Record<string, unknown>) => ({
          ...action,
          action: () => this.record('actionsList.action', action['name']),
        }),
      );
    const empty = values['emptyStateData'];
    if (empty && typeof empty === 'object' && !Array.isArray(empty))
      values['emptyStateData'] = {
        ...empty,
        onClick: () => this.record('emptyStateData.onClick', undefined),
      };
    for (const key of ['alerts', 'advertisements']) {
      if (Array.isArray(values[key]))
        values[key] = (values[key] as Record<string, unknown>[]).map(
          (alert) => ({
            ...alert,
            description: Array.isArray(alert['description'])
              ? alert['description'].map((item: Record<string, unknown>) =>
                  item['type'] === 'button' && item['event']
                    ? {
                        ...item,
                        event: (id: unknown) =>
                          this.record(`${key}.button`, id),
                      }
                    : item,
                )
              : alert['description'],
          }),
        );
    }
    return values;
  }

  private connectOutputs(): void {
    const instance = this.outlet()?.componentInstance;
    if (!instance || instance === this.instance) return;
    this.disconnect();
    this.instance = instance;
    for (const metadata of reflectComponentType(this.component())?.outputs ??
      []) {
      const emitter = (instance as Record<string, unknown>)[
        metadata.propName
      ] as
        | {
            subscribe?: (handler: (value: unknown) => void) => {
              unsubscribe(): void;
            };
          }
        | undefined;
      if (emitter?.subscribe)
        this.subscriptions.push(
          emitter.subscribe((value) => {
            this.record(metadata.templateName, value);
            const property = this.configuration().properties.find(
              (p) => p.model && `${p.name}Change` === metadata.templateName,
            );
            if (property)
              this.setDraft(
                property.name,
                property.kind === 'boolean'
                  ? !!value
                  : property.kind === 'json'
                    ? serializeDemoValue(value)
                    : String(value ?? ''),
                false,
              );
          }),
        );
    }
  }

  private disconnect(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
    this.instance = undefined;
  }
}
