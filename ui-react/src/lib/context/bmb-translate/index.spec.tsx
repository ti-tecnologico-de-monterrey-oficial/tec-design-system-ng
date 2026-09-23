import { render, screen, waitFor } from '@testing-library/react';
import { useBmbTranslate, BmbTranslateProvider } from './index';

const spanishDictionary = {
  common: {
    save: 'Guardar',
  },
  nested: {
    label: 'Etiqueta',
  },
};

const englishDictionary = {
  common: {
    save: 'Save',
  },
  nested: {
    label: 'Label',
  },
};

function TranslationConsumer() {
  const {
    addDictionary,
    getCurrentLanguage,
    getTranslationVersion,
    loadDictionaryFromAssets,
    setLanguage,
    translate,
    updateDictionary,
  } = useBmbTranslate();

  return (
    <div>
      <span data-testid="language">{getCurrentLanguage()}</span>
      <span data-testid="version">{getTranslationVersion()}</span>
      <span data-testid="save">{translate('common.save')}</span>
      <span data-testid="nested">{translate('nested.label')}</span>
      <span data-testid="missing">{translate('missing.key')}</span>
      <button onClick={() => setLanguage('en')}>English</button>
      <button
        onClick={() =>
          addDictionary('fr', {
            common: { save: 'Sauvegarder' },
          })
        }
      >
        Add French
      </button>
      <button onClick={() => setLanguage('fr')}>French</button>
      <button
        onClick={() =>
          updateDictionary('es', {
            common: { save: 'Guardar cambios' },
          })
        }
      >
        Update Spanish
      </button>
      <button
        onClick={() => {
          void loadDictionaryFromAssets('de', '/translations');
        }}
      >
        Load German
      </button>
    </div>
  );
}

function renderProvider() {
  return render(
    <BmbTranslateProvider
      dictionaries={{ es: spanishDictionary, en: englishDictionary }}
    >
      <TranslationConsumer />
    </BmbTranslateProvider>,
  );
}

describe('BmbTranslateProvider', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockImplementation((url: string) => {
      const dictionary = url.endsWith('/en.json')
        ? englishDictionary
        : spanishDictionary;

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(dictionary),
      });
    });
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    fetchMock.mockReset();
  });

  it('translates nested keys and returns the key when no translation exists', () => {
    renderProvider();

    expect(screen.getByTestId('language').textContent).toBe('es');
    expect(screen.getByTestId('save').textContent).toBe('Guardar');
    expect(screen.getByTestId('nested').textContent).toBe('Etiqueta');
    expect(screen.getByTestId('missing').textContent).toBe('missing.key');
  });

  it('changes the active language when its dictionary exists', async () => {
    renderProvider();

    screen.getByRole('button', { name: 'English' }).click();

    expect(screen.getByTestId('language').textContent).toBe('en');
    expect(screen.getByTestId('save').textContent).toBe('Save');
    await waitFor(() =>
      expect(screen.getByTestId('nested').textContent).toBe('Label'),
    );
  });

  it('adds a dictionary and allows switching to it', () => {
    renderProvider();

    screen.getByRole('button', { name: 'Add French' }).click();
    screen.getByRole('button', { name: 'French' }).click();

    expect(screen.getByTestId('language').textContent).toBe('fr');
    expect(screen.getByTestId('save').textContent).toBe('Sauvegarder');
  });

  it('updates an existing dictionary without removing other languages', () => {
    renderProvider();

    screen.getByRole('button', { name: 'Update Spanish' }).click();

    expect(screen.getByTestId('save').textContent).toBe('Guardar cambios');
    screen.getByRole('button', { name: 'English' }).click();
    expect(screen.getByTestId('save').textContent).toBe('Save');
  });

  it('warns and keeps the current language when a dictionary is missing', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    renderProvider();

    screen.getByRole('button', { name: 'French' }).click();

    expect(screen.getByTestId('language').textContent).toBe('es');
    expect(warnSpy).toHaveBeenCalledWith(
      'The selected language "fr" does not have an associated dictionary.',
    );
  });

  it('loads a dictionary from assets with the requested base path', async () => {
    renderProvider();

    screen.getByRole('button', { name: 'Load German' }).click();

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith('/translations/de.json'),
    );
  });

  it('throws when the hook is used outside its provider', () => {
    function InvalidConsumer() {
      useBmbTranslate();
      return null;
    }

    expect(() => render(<InvalidConsumer />)).toThrow(
      'useBmbTranslate must be used inside BmbTranslateProvider',
    );
  });
});
