export const getInitialTheme_core = (defaultTheme: string): string => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return defaultTheme;
};

export const getLocalTheme = (): string | null => {
  return localStorage.getItem('theme');
};

export const setLocalTheme = (theme: string): void => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};
