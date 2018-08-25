import Swedish from '../locales/sv-SE';
import English from '../locales/en-US';
import sweTextFile from '../locales/swe-words';
import engTextFile from '../locales/eng-words';

export const getWord = (word, locale) => {
  switch (locale) {
    case 'sv-SE': return Swedish[word];
    case 'en-US': return English[word];
    default: return English[word];
  }
};

export const getCorrectTextFile = locale => {
  switch (locale) {
    case 'en-US': return engTextFile;
    case 'sv-SE': return sweTextFile;
    default: return sweTextFile;
  }
};
