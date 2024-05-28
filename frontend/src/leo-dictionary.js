import leo from 'leo-profanity';

export const enWords = leo.getDictionary('en');
export const ruWords = leo.getDictionary('ru');

leo.add(enWords);
leo.add(ruWords);
