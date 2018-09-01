/*
  Used for copying new words from Google Spreadsheet
*/

/* eslint-disable */
const list2 = '...'.split(',');
const list = list2.map(s => s.replace('   ', ''));
const unique = [];
list.forEach(s => {
  if (unique.indexOf(s) === -1) {
    unique.push(s);
  }
});
const unique2 = unique.map(s => `"${s}`);
console.log(`
    ${unique2.join('",\n    ')}"
`);
