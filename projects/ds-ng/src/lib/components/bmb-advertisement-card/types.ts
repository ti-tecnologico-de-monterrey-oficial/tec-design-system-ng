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
  | 'brand'
  | 'background'
  | 'disabled'
  | 'mitec_blue'
  | 'mitec_red'
  | 'mitec_green'
  | 'mitec_orange'
  | 'mitec_light_green'
  | 'mitec_purple'
  | 'creative_violet'
  | 'creative_indigo'
  | 'creative_emerald'
  | 'creative_licorice'
  | 'creative_darkteal'
  | 'creative_peach'
  | 'creative_sepia'
  | 'creative_softred'
  | 'creative_wattle'
  | 'creative_shipcove'
  | 'creative_plantation'
  | 'creative_rum'
  | 'creative_hibiscus'
  | 'creative_ripelemon';
