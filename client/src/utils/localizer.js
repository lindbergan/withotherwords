import Swedish from '../locales/sv-SE';
import English from '../locales/en-US';

export const getWord = (word, locale) => {
  switch (locale) {
    case 'sv-SE': return Swedish[word];
    case 'en-US': return English[word];
    default: return English[word];
  }
};
