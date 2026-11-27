export type IBmbTimepickerFormat = '12h' | '24h';
export type IBmbTimepickerPeriod = 'AM' | 'PM';
export type IBmbMinuteStep = 1 | 2 | 5 | 10 | 15 | 30;

export interface IParsedTime {
  hour: number; // 0-23
  minute: number;
}
