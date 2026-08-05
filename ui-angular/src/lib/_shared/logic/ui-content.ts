export const sharedTagline = 'Shared UI logic and assets across React and Angular';

export function getWelcomeTitle(framework: 'React' | 'Angular'): string {
  return `UI Library (${framework})`;
}
