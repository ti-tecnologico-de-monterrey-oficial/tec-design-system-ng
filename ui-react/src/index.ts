export const BAMBOO_VERSION = '0.0.1';

export {
	BmbTranslateProvider,
	useBmbTranslate,
} from './lib/context/bmb-translate';
export type {
	BmbDictionaries,
	BmbTranslateContextValue,
	BmbTranslateProviderProps,
	BmbTranslationValue,
} from './lib/context/bmb-translate';

export { BmbSimpleText } from './lib/component/bmb-simple-text';
export type {
	BmbSimpleTextProps,
	IBmbSimpleTextElementType,
} from './lib/component/bmb-simple-text';

export { BmbDivider } from './lib/component/bmb-divider';
export type { BmbDividerProps } from './lib/component/bmb-divider';

export { BmbNotificationCounter } from './lib/component/bmb-notification-counter';
export type {
	BmbNotificationCounterProps,
	IBmbNotificationCounterType,
} from './lib/component/bmb-notification-counter';

