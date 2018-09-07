/*
    Used to remove duplicate words
*/
/* eslint-disable */
const sweWords = require('../locales/swe-words');
const engWords = require('../locales/eng-words');

const fs = require('fs');

const sweUnique = [];
sweWords.forEach(s => {
  if (sweUnique.indexOf(s) === -1 && s.length <= 13 && s.length >= 3) {
    sweUnique.push(s);
  }
});
const engUnique = [];
engWords.forEach(s => {
  if (engUnique.indexOf(s) === -1 && s.length <= 13 && s.length >= 3) {
    engUnique.push(s);
  }
});
fs.writeFileSync('/Users/lindberg/funsites/withotherwords/client/src/locales/swe-words.json', JSON.stringify(sweUnique));
fs.writeFileSync('/Users/lindberg/funsites/withotherwords/client/src/locales/eng-words.json', JSON.stringify(engUnique));
console.log("Done!");




