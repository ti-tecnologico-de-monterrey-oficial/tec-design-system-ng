import { Component, input, model, output, reflectComponentType } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmbAlertCenterComponent, BmbCalendarComponent, BmbChatBarComponent, BmbFilterCardComponent, BmbTimestreamCardComponent, BmbTimestreamComponent, BmbTitleContentComponent } from 'ui-angular';
import { createDemoConfiguration } from './demo-configurations';
import { DemoConfiguration, parseDemoProperties, demoDrafts } from './demo-properties';
import { PropertyPlayground } from './property-playground';

@Component({
  selector: 'app-demo-fixture',
  template: '<p>{{ label() }} {{ count() }}</p>',
})
class DemoFixture {
  readonly label = input('Initial');
  readonly count = model(0);
  readonly submitted = output<string>();
}

describe('PropertyPlayground', () => {
  let component: PropertyPlayground;
  let fixture: ComponentFixture<PropertyPlayground>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyPlayground, DemoFixture],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyPlayground);
    component = fixture.componentInstance;
    const configuration: DemoConfiguration = {
      title: 'Fixture',
      properties: [
        { name: 'label', kind: 'text', type: 'string' },
        { name: 'count', kind: 'number', type: 'number', model: true },
      ],
      initial: { label: 'Initial', count: 0 },
    };
    fixture.componentRef.setInput('component', DemoFixture);
    fixture.componentRef.setInput('configuration', configuration);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('applies properties to a fresh example and resets its defaults', async () => {
    const first = component.outlet()?.componentInstance;
    component.setDraft('label', 'Changed');
    component.apply();
    fixture.detectChanges();
    await fixture.whenStable();
    const current = component.outlet()?.componentInstance as DemoFixture;
    expect(current).not.toBe(first);
    expect(current.label()).toBe('Changed');
    component.reset();
    fixture.detectChanges();
    await fixture.whenStable();
    expect((component.outlet()?.componentInstance as DemoFixture).label()).toBe(
      'Initial',
    );
  });

  it('captures output events and reflects model changes in the editor', () => {
    const instance = component.outlet()?.componentInstance as DemoFixture;
    instance.submitted.emit('sent');
    instance.count.set(3);
    expect(component.events()).toEqual(
      expect.arrayContaining([
        { name: 'submitted', payload: '"sent"' },
        { name: 'countChange', payload: '3' },
      ]),
    );
    expect(component.drafts()['count']).toBe('3');
  });

  it('refreshes the visible example when a text control is edited without clicking Apply', async () => {
    const previous = component.outlet()?.componentInstance;
    const control = fixture.nativeElement.querySelector('#demo-label') as HTMLInputElement;
    control.value = 'Live title';
    control.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.outlet()?.componentInstance).not.toBe(previous);
    expect(fixture.nativeElement.querySelector('app-demo-fixture').textContent).toContain('Live title');
  });

  it('keeps invalid edits in the editor and refreshes once they become valid', async () => {
    const previous = component.outlet()?.componentInstance;
    component.setDraft('count', 'invalid');
    fixture.detectChanges();
    expect(component.error()).toContain('count:');
    expect(component.outlet()?.componentInstance).toBe(previous);

    component.setDraft('count', '7');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.error()).toBe('');
    expect((component.outlet()?.componentInstance as DemoFixture).count()).toBe(7);
  });

  it('reflects model emissions without recreating the component or resetting its state', async () => {
    const instance = component.outlet()?.componentInstance as DemoFixture;
    const revision = component.revision();
    instance.count.set(5);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.drafts()['count']).toBe('5');
    expect(component.revision()).toBe(revision);
    expect(component.outlet()?.componentInstance).toBe(instance);
    expect(instance.count()).toBe(5);
  });

  it('keeps the current example when validation fails', () => {
    const previous = component.outlet()?.componentInstance;
    const revision = component.revision();
    component.setDraft('count', 'not a number');
    component.apply();
    expect(component.error()).toContain('count:');
    expect(component.revision()).toBe(revision);
    expect(component.outlet()?.componentInstance).toBe(previous);
  });

  it('reports malformed JSON without applying it', () => {
    expect(() =>
      parseDemoProperties(
        [{ name: 'events', kind: 'json', type: 'Event[]', shape: 'array' }],
        { events: '{bad json' },
      ),
    ).toThrow('events:');
    expect(() =>
      parseDemoProperties(
        [{ name: 'events', kind: 'json', type: 'Event[]', shape: 'array' }],
        { events: '{}' },
      ),
    ).toThrow('Enter a JSON array');
  });

  it('wires JSON action descriptions to working callbacks', () => {
    const configuration: DemoConfiguration = {
      title: 'Callbacks',
      properties: [
        { name: 'label', kind: 'text', type: 'string' },
        { name: 'count', kind: 'number', type: 'number' },
        {
          name: 'actionsList',
          kind: 'json',
          type: 'Action[]',
          shape: 'array',
          service: true,
        },
      ],
      initial: {
        label: 'Initial',
        count: 0,
        actionsList: [{ name: 'Attach', icon: 'attach_file' }],
      },
    };
    fixture.componentRef.setInput('configuration', configuration);
    fixture.detectChanges();
    component.drafts.set(demoDrafts(configuration));
    const applied = jest.fn();
    component.propertiesApplied.subscribe(applied);
    component.apply();
    applied.mock.calls[0][0]['actionsList'][0].action();
    expect(component.events()[0].name).toBe('actionsList.action');
  });

  it.each([
    ['alert-center', BmbAlertCenterComponent],
    ['calendar', BmbCalendarComponent],
    ['chat-bar', BmbChatBarComponent],
    ['timestream-card', BmbTimestreamCardComponent],
    ['title-content', BmbTitleContentComponent],
    ['timestream', BmbTimestreamComponent],
    ['filter-card', BmbFilterCardComponent],
  ] as const)(
    'covers every public input/model of %s with valid defaults',
    (name, type) => {
      const configuration = createDemoConfiguration(name);
      const configured = configuration.properties
        .filter((p) => !p.service)
        .map((p) => p.name)
        .sort();
      const actual = reflectComponentType(type)
        ?.inputs.map((p) => p.templateName)
        .sort();
      expect(configured).toEqual(actual);
      expect(() =>
        parseDemoProperties(
          configuration.properties,
          demoDrafts(configuration),
        ),
      ).not.toThrow();
    },
  );
});
