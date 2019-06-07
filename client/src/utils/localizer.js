import Swedish from "../locales/sv-SE";
import English from "../locales/en-US";

import sweTextFile from "../locales/swe-words";
import engTextFile from "../locales/eng-words";

export const sweLocale = "sv-SE";
export const engLocale = "en-US";

export const getWord = (word, locale) => {
  switch (locale) {
    case sweLocale:
      return Swedish[word];
    case engLocale:
      return English[word];
    default:
      return English[word];
  }
};

export const getCorrectTextFile = locale => {
  switch (locale) {
    case engLocale:
      return engTextFile;
    case sweLocale:
      return sweTextFile;
    default:
      return engTextFile;
  }
};
