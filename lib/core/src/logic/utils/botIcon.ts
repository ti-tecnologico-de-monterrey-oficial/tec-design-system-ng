export const isABotIcon = (iconName: string): boolean => {
  const botIcons = [
    'bot_tecStandar',
    'bot_chatGPT',
    'bot_tecGPT',
    'comment',
    'new',
    'bot_tecSchool',
    'bot_tecTech',
    'bot_tecSport',
    'bot_tecPhone',
    'bot_health',
    'bot_tecScience',
    'empty',
    'anthropic',
    'meta',
    'google',
    'xai',
  ];

  return botIcons.includes(iconName);
};
