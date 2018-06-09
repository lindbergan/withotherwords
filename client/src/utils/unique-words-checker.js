/*
    Used to remove duplicate words
*/
/* eslint-disable */
const words = require('../locales/swe-words');

const unique = [];
words.forEach(s => {
  if (unique.indexOf(s) === -1 && s.length < 15 && s.length > 0) {
    unique.push(s);
  }
});
const unique2 = unique.map(s => `"${s}`);
console.log(`[
    ${unique2.join('",\n    ')}"
]`);


