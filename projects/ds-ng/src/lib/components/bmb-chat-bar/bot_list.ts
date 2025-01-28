import { IChatBarActions } from './types';

export const defaultBotList = [
  {
    name: 'TecBot',
    icon: '/assets/images/bot-icons/bot_tecStandar.svg',
  },
  {
    name: 'ChatGPT',
    icon: '/assets/images/bot-icons/bot_tecGPT.svg',
  },
  {
    name: 'Comment',
    icon: '/assets/images/bot-icons/comment.svg',
  },
  {
    name: 'New',
    icon: '/assets/images/bot-icons/new.svg',
  },
  {
    name: 'BotSchool',
    icon: '/assets/images/bot-icons/bot_tecSchool.svg',
  },
  {
    name: 'BotTech',
    icon: '/assets/images/bot-icons/bot_tecTech.svg',
  },
  {
    name: 'BotSport',
    icon: '/assets/images/bot-icons/bot_tecSport.svg',
  },
  {
    name: 'BotPhone',
    icon: '/assets/images/bot-icons/bot_tecPhone.svg',
  },
  {
    name: 'BotMedic',
    icon: '/assets/images/bot-icons/bot_health.svg',
  },
  {
    name: 'BotScience',
    icon: '/assets/images/bot-icons/bot_tecScience.svg',
  },
  {
    name: 'Backup',
    icon: '/assets/images/bot-icons/backup.svg',
  },
];

export const defaultActionList: IChatBarActions[] = [
  {
    name: 'Adjuntar Archivo',
    icon: 'upload_file',
    action: () => {
      const input = document.getElementById('inputFile') as HTMLInputElement;
      input?.click();
    },
  },
];
