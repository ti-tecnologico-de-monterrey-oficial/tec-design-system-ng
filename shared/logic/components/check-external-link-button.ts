import { isExternalLink } from '../utils';

export const isButtonExternalLink = (link: string): boolean => {
  return (!!link && isExternalLink(link)) || false;
};

export const isButton = (isLink: boolean): boolean => {
  return !isLink;
};
