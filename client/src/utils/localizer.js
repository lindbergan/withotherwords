import Swedish from "../locales/sv-SE";
import English from "../locales/en-US";

import sweTextFile from "../locales/swe-words";
import engTextFile from "../locales/eng-words";

export const sweLocale = "sv-SE";
export const engLocale = "en-US";

const swedishWords = Object.values(sweTextFile)
const englishWords = Object.values(engTextFile)

const previousWordIds = [];

function getRandomId(locale) {
  function getRandomUnseenId(words) {
    const getRandomIndex = (words) => parseInt(Math.random() * words.length)
    let i = getRandomIndex(words);
    while (previousWordIds.includes(i)) i = getRandomIndex(words);
    return i;
  }

  switch (locale) {
    case sweLocale:
      return getRandomUnseenId(swedishWords)
    case engLocale:
      return getRandomUnseenId(englishWords)
    default:
      return getRandomUnseenId(swedishWords)
  }
}

export const getRandomWord = (locale) => {
  switch (locale) {
    case sweLocale:
      return swedishWords[getRandomId(locale)]
    case engLocale:
      return englishWords[getRandomId(locale)]
    default:
      return swedishWords[getRandomId(locale)]
  }
};

export const getCorrectTextFile = locale => {
  switch (locale) {
    case engLocale:
      return engTextFile;
    case sweLocale:
      return sweTextFile;
    default:
      return sweTextFile;
  }
};