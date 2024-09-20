export type IBmbAdvertisementCard = {
  content: IBmbAdvertisementContent;
  imgData: IBmbAdvertisementImage;
};

export type IBmbAdvertisementContent = {
  description: string;
  linkBtn?: string;
  title: string;
  labelBtn?: string;
};

export type IBmbAdvertisementImage = {
  alt: string;
  url: string;
};

export type IBmbAdvertisementData = {
  promociones: Array<IBmbAdvertisementCard>;
  avisos: Array<IBmbAdvertisementCard>;
  informacion: Array<IBmbAdvertisementCard>;
};

export type IBbmBgAppearance =
  | 'normal'
  | 'strong'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'brand';
