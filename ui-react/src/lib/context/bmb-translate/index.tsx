import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';

export type BmbTranslationValue =
	| string
	| {
			[key: string]: BmbTranslationValue;
		};

export interface BmbDictionaries {
	[key: string]: BmbTranslationValue;
}

export interface BmbTranslateContextValue {
	getCurrentLanguage: () => string;
	getTranslationVersion: () => number;
	setLanguage: (language: string) => void;
	loadDictionaryFromAssets: (
		language: string,
		basePath?: string,
	) => Promise<boolean>;
	updateDictionary: (language: string, dictionary: BmbDictionaries) => void;
	addDictionary: (language: string, dictionary: BmbDictionaries) => void;
	translate: (keyList: string) => string;
}

export interface BmbTranslateProviderProps {
	readonly children: ReactNode;
	readonly defaultLanguage?: string;
	readonly basePath?: string;
	readonly dictionaries?: Record<string, BmbDictionaries>;
}

const DEFAULT_LANGUAGE = 'es';
const DEFAULT_BASE_PATH = '/assets/shared/i18n';

const BmbTranslateContext = createContext<
	BmbTranslateContextValue | undefined
>(undefined);

export function BmbTranslateProvider({
	children,
	defaultLanguage = DEFAULT_LANGUAGE,
	basePath = DEFAULT_BASE_PATH,
	dictionaries: initialDictionaries = {},
}: BmbTranslateProviderProps) {
	const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
	const [dictionaries, setDictionaries] =
		useState<Record<string, BmbDictionaries>>(initialDictionaries);
	const [translationVersion, setTranslationVersion] = useState(0);

	const bumpTranslationVersion = useCallback(() => {
		setTranslationVersion((version) => version + 1);
	}, []);

	const addDictionary = useCallback(
		(language: string, dictionary: BmbDictionaries) => {
			setDictionaries((currentDictionaries) => ({
				...currentDictionaries,
				[language]: dictionary,
			}));
			bumpTranslationVersion();
		},
		[bumpTranslationVersion],
	);

	const updateDictionary = useCallback(
		(language: string, dictionary: BmbDictionaries) => {
			setDictionaries((currentDictionaries) => ({
				...currentDictionaries,
				[language]: {
					...currentDictionaries[language],
					...dictionary,
				},
			}));
			bumpTranslationVersion();
		},
		[bumpTranslationVersion],
	);

	const loadDictionaryFromAssets = useCallback(
		async (language: string, dictionaryBasePath = basePath) => {
			try {
				const response = await fetch(`${dictionaryBasePath}/${language}.json`);

				if (!response.ok) {
					console.warn(
						`Could not load dictionary for language "${language}" from ${dictionaryBasePath}.`,
					);
					return false;
				}

				const dictionary = (await response.json()) as BmbDictionaries;
				addDictionary(language, dictionary);
				return true;
			} catch {
				console.warn(
					`An error occurred while loading dictionary for language "${language}" from ${dictionaryBasePath}.`,
				);
				return false;
			}
		},
		[addDictionary, basePath],
	);

	useEffect(() => {
		void loadDictionaryFromAssets('es');
		void loadDictionaryFromAssets('en');
	}, [loadDictionaryFromAssets]);

	const setLanguage = useCallback(
		(language: string) => {
			if (currentLanguage === language) {
				if (!dictionaries[language]) {
					void loadDictionaryFromAssets(language);
				}
				return;
			}

			if (!dictionaries[language]) {
				console.warn(
					`The selected language "${language}" does not have an associated dictionary.`,
				);
				return;
			}

			setCurrentLanguage(language);
			bumpTranslationVersion();
		},
		[
			bumpTranslationVersion,
			currentLanguage,
			dictionaries,
			loadDictionaryFromAssets,
		],
	);

	const translate = useCallback(
		(keyList: string) => {
			const translatedValue = keyList?.split('.').reduce<unknown>(
				(value, key) => {
					if (
						value &&
						typeof value === 'object' &&
						key in value
					) {
						return (value as Record<string, unknown>)[key];
					}

					return undefined;
				},
				dictionaries[currentLanguage],
			);

			return typeof translatedValue === 'string' ? translatedValue : keyList;
		},
		[currentLanguage, dictionaries],
	);

	const contextValue = useMemo<BmbTranslateContextValue>(
		() => ({
			getCurrentLanguage: () => currentLanguage,
			getTranslationVersion: () => translationVersion,
			setLanguage,
			loadDictionaryFromAssets,
			updateDictionary,
			addDictionary,
			translate,
		}),
		[
			addDictionary,
			currentLanguage,
			loadDictionaryFromAssets,
			setLanguage,
			translate,
			translationVersion,
			updateDictionary,
		],
	);

	return (
		<BmbTranslateContext.Provider value={contextValue}>
			{children}
		</BmbTranslateContext.Provider>
	);
}

export function useBmbTranslate() {
	const context = useContext(BmbTranslateContext);

	if (!context) {
		throw new Error(
			'useBmbTranslate must be used inside BmbTranslateProvider',
		);
	}

	return context;
}
