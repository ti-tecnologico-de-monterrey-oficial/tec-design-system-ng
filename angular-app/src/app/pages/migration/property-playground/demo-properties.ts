export type DemoValue = string | number | boolean | null | undefined | object;

export interface DemoProperty {
  name: string;
  kind: 'text' | 'number' | 'boolean' | 'json' | 'size' | 'select';
  type: string;
  options?: string[];
  shape?: 'array' | 'object';
  optional?: boolean;
  model?: boolean;
  deprecated?: boolean;
  service?: boolean;
  hint?: string;
}

export interface DemoConfiguration {
  title: string;
  properties: DemoProperty[];
  initial: Record<string, DemoValue>;
  tall?: boolean;
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);

function validateJsonProperty(name: string, value: DemoValue): void {
  if (value === undefined) return;
  const list = Array.isArray(value) ? value : [];
  if (
    ['botList', 'actionsList'].includes(name) &&
    !list.every(
      (item) =>
        isObject(item) &&
        typeof item['name'] === 'string' &&
        typeof item['icon'] === 'string',
    )
  )
    throw new Error('Each entry needs a name and icon.');
  if (
    name === 'currentBot' &&
    (!isObject(value) ||
      typeof value['name'] !== 'string' ||
      typeof value['icon'] !== 'string')
  )
    throw new Error('Provide a bot with name and icon.');
  if (
    ['alerts', 'advertisements'].includes(name) &&
    !list.every(
      (item) =>
        isObject(item) &&
        typeof item['title'] === 'string' &&
        typeof item['date'] === 'string' &&
        typeof item['time'] === 'string' &&
        Array.isArray(item['description']) &&
        item['description'].every(isObject),
    )
  )
    throw new Error(
      'Each alert needs title, date, time and a description array.',
    );
  if (
    ['events', 'calendarEvents'].includes(name) &&
    !list.every(
      (item) =>
        isObject(item) &&
        typeof item['start'] === 'string' &&
        typeof item['end'] === 'string' &&
        typeof item['title'] === 'string',
    )
  )
    throw new Error('Each event needs start, end and title strings.');
  if (
    name === 'tabsName' &&
    !list.every(
      (item) =>
        typeof item === 'string' ||
        (isObject(item) && typeof item['title'] === 'string'),
    )
  )
    throw new Error('Each tab must be a string or an object with a title.');
  if (
    name === 'dataLocalNav' &&
    !list.every((item) => isObject(item) && typeof item['text'] === 'string')
  )
    throw new Error('Each breadcrumb needs text.');
  if (
    name === 'controlTypes' &&
    !list.every(
      (section) =>
        isObject(section) &&
        typeof section['title'] === 'string' &&
        Array.isArray(section['control']) &&
        section['control'].every(
          (control) =>
            isObject(control) &&
            typeof control['name'] === 'string' &&
            ['radial', 'checkbox', 'switch', 'tag', 'dropdown'].includes(
              String(control['type']),
            ),
        ),
    )
  )
    throw new Error(
      'Each section needs a title and control array with valid names and types.',
    );
  if (
    ['visibilityRules', 'optionRules'].includes(name) &&
    !list.every(
      (rule) =>
        isObject(rule) &&
        isObject(rule['when']) &&
        (name === 'visibilityRules'
          ? [rule['show'], rule['hide']].every(
              (ids) =>
                ids === undefined ||
                (Array.isArray(ids) &&
                  ids.every((id) => typeof id === 'string')),
            )
          : typeof rule['target'] === 'string' &&
            Array.isArray(rule['options'])),
    )
  )
    throw new Error(
      'Rules need a when object and valid show/hide lists or target/options.',
    );
  if (
    ['filters', 'notificationSelectionState', 'enabledFooterOptions'].includes(
      name,
    ) &&
    isObject(value) &&
    !Object.values(value).every((item) => typeof item === 'boolean')
  )
    throw new Error('Use boolean values for this object.');
  if (
    name === 'emptyStateData' &&
    (!isObject(value) ||
      typeof value['primaryText'] !== 'string' ||
      !['large', 'medium', 'small'].includes(String(value['size'])))
  )
    throw new Error('Provide primaryText and a large, medium or small size.');
  if (
    name === 'clamp' &&
    (!isObject(value) ||
      !['min', 'max', 'size'].every((key) =>
        ['string', 'number'].includes(typeof value[key]),
      ))
  )
    throw new Error('Provide min, max and size as numbers or strings.');
}

export function serializeDemoValue(value: unknown): string {
  return (
    JSON.stringify(
      value,
      (_key, item: unknown) => {
        if (typeof item === 'function') return '[callback]';
        if (typeof File !== 'undefined' && item instanceof File)
          return { name: item.name, size: item.size, type: item.type };
        if (typeof Event !== 'undefined' && item instanceof Event)
          return { type: item.type };
        return item;
      },
      2,
    ) ?? ''
  );
}

export function demoDrafts(
  configuration: DemoConfiguration,
): Record<string, string | boolean> {
  return Object.fromEntries(
    configuration.properties.map((property) => {
      const value = configuration.initial[property.name];
      return [
        property.name,
        property.kind === 'boolean'
          ? !!value
          : property.kind === 'json'
            ? serializeDemoValue(value)
            : String(value ?? ''),
      ];
    }),
  );
}

export function parseDemoProperties(
  properties: DemoProperty[],
  drafts: Record<string, string | boolean>,
): Record<string, DemoValue> {
  const values: Record<string, DemoValue> = {};
  for (const property of properties) {
    const draft = drafts[property.name],
      text = String(draft ?? '');
    let value: DemoValue;
    try {
      if (property.kind === 'boolean') value = draft === true;
      else if (property.optional && !text.trim()) value = undefined;
      else if (property.kind === 'json') {
        value = JSON.parse(text);
        if (property.shape === 'array' && !Array.isArray(value))
          throw new Error('Enter a JSON array.');
        if (
          property.shape === 'object' &&
          (!value || typeof value !== 'object' || Array.isArray(value))
        )
          throw new Error('Enter a JSON object.');
      } else if (property.kind === 'number') {
        if (!text.trim() || !Number.isFinite(Number(text)))
          throw new Error('Enter a valid number.');
        value = Number(text);
      } else if (property.kind === 'size')
        value = /^\d+(\.\d+)?$/.test(text) ? Number(text) : text;
      else value = text;
      if (
        property.options &&
        value !== undefined &&
        !property.options.includes(String(value))
      )
        throw new Error('Choose one of the listed values.');
      if (
        property.name.toLowerCase().includes('timezone') &&
        typeof value === 'string'
      )
        new Intl.DateTimeFormat('en', { timeZone: value });
      if (property.name === 'lang' && typeof value === 'string')
        new Intl.DateTimeFormat(value);
      if (property.kind === 'json') validateJsonProperty(property.name, value);
      if (property.name === 'dateFormat' && !text.trim())
        throw new Error('Enter a date format.');
      values[property.name] = value;
    } catch (error) {
      throw new Error(
        `${property.name}: ${error instanceof Error ? error.message : 'Invalid value.'}`,
      );
    }
  }
  if (
    'componentTitle' in values &&
    !values['componentTitle'] &&
    !values['title']
  )
    throw new Error('Provide componentTitle or the deprecated title.');
  return values;
}
