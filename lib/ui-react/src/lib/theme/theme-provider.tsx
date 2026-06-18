import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  getInitialTheme_core,
  getLocalTheme,
  setLocalTheme,
} from '@ti-tecnologico-de-monterrey-oficial/core';

export interface ThemeContextValue {
  theme: string;
  defaultTheme: string;
  getInitialTheme: () => string;
  setInitialTheme: (newInitialTheme?: string) => void;
  setThemeAndSaveInLocal: (theme: string) => void;
  getTheme: () => string;
  getDefaultTheme: () => string;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>(() => {
    if (!isBrowser()) {
      return defaultTheme;
    }

    return getInitialTheme_core(defaultTheme);
  });

  const getInitialTheme = useCallback((): string => {
    if (!isBrowser()) {
      return defaultTheme;
    }

    return getInitialTheme_core(defaultTheme);
  }, [defaultTheme]);

  const setInitialTheme = useCallback(
    (newInitialTheme?: string): void => {
      if (!isBrowser()) {
        setTheme(newInitialTheme ?? defaultTheme);
        return;
      }

      const savedTheme = getLocalTheme();

      if (newInitialTheme && !savedTheme) {
        setTheme(newInitialTheme);
        setLocalTheme(newInitialTheme);
        return;
      }

      if (savedTheme) {
        setTheme(savedTheme);
        setLocalTheme(savedTheme);
        return;
      }

      setTheme(defaultTheme);
      setLocalTheme(defaultTheme);
    },
    [defaultTheme]
  );

  const setThemeAndSaveInLocal = useCallback((nextTheme: string): void => {
    setTheme(nextTheme);

    if (isBrowser()) {
      setLocalTheme(nextTheme);
    }
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      defaultTheme,
      getInitialTheme,
      setInitialTheme,
      setThemeAndSaveInLocal,
      getTheme: () => theme,
      getDefaultTheme: () => defaultTheme,
    }),
    [
      theme,
      defaultTheme,
      getInitialTheme,
      setInitialTheme,
      setThemeAndSaveInLocal,
    ]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
