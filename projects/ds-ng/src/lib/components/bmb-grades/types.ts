export type IBmbElementDetail = {
  title: string;
  subtitle: string;
  score: number;
};

export type IBmbPartial = {
  title: string;
  score: number;
};

export type IBmbClassDetail = {
  detail: IBmbElementDetail;
  partials: IBmbPartial[];
};

export type IBmbPeriod = {
  detail: IBmbElementDetail;
  accreditedClasses: number;
  periodAverage: number;
  serviceHours: number;
  classes: IBmbClassDetail[];
};

export type IBmbGrades = {
  title: string;
  subtitle: string;
  periods: IBmbPeriod[];
};
