import { openDefaultChatFileInput } from '../browser/chat-bar';
import type { IChatBarActions } from '../../types/components/chat-bar';

export const defaultBotList = [
  {
    name: 'TecBot',
    label: 'Tecbot Standard',
    icon: 'bot_tecStandar',
  },
  { name: 'ChatGPT', label: 'ChatGPT', icon: 'bot_chatGPT' },
  {
    name: 'TecGPT',
    label: 'TecGPT',
    icon: 'bot_tecGPT',
  },
  { name: 'Comment', label: 'Comment', icon: 'comment' },
  { name: 'New', label: 'New', icon: 'new' },
  { name: 'BotSchool', label: 'Tecbot school', icon: 'bot_tecSchool' },
  { name: 'BotTech', label: 'Tecbot tech', icon: 'bot_tecTech' },
  { name: 'BotSport', label: 'Tecbot sport', icon: 'bot_tecSport' },
  { name: 'BotPhone', label: 'Tecbot phone', icon: 'bot_tecPhone' },
  { name: 'BotMedic', label: 'Tecbot healt', icon: 'bot_health' },
  { name: 'BotScience', label: 'Tecbot science', icon: 'bot_tecScience' },
  { name: 'Empty', label: 'Empty', icon: 'empty' },
  { name: 'Anthropic', label: 'Anthropic', icon: 'anthropic' },
  { name: 'Meta', label: 'Meta', icon: 'meta' },
  { name: 'Xai', label: 'Xai', icon: 'xai' },
  { name: 'Google', label: 'Google', icon: 'google' },
];

export function createDefaultActionList(
  uploadFile: () => void,
): IChatBarActions[] {
  return [
    {
      name: 'Adjuntar Archivo',
      label: 'Adjuntar Archivo',
      icon: 'upload_file',
      action: uploadFile,
    },
  ];
}

export const defaultActionList = createDefaultActionList(
  openDefaultChatFileInput,
);
