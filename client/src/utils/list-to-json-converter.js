/*
  Used for copying new words from Google Spreadsheet
*/

/* eslint-disable */
const list2 = 'Tom Cruise,Rolling Stones,Oprah Winfrey,U2,Tiger Woods,Steven Spielberg,Howard Stern,50 Cent,Dan Brown,Bruce Springsteen,Donald Trump,Muhammad Ali,Paul McCartney,George Lucas,Elton John,David Letterman,Phil Mickelson,J.K. Rowling,Brad Pitt,Peter Jackson,Dr. Phil McGraw,Jay Leno,Celine Dion,Kobe Bryant,Michael Jordan,Johnny Depp,Jerry Seinfeld,Simon Cowell,Michael Schumacher,Tom Hanks,Rush Limbaugh,Denzel Washington,Jennifer Aniston,Angelina Jolie,The Olsen Twins,Nicole Kidman,The Eagles,Rod Stewart,Shaquille O\'Neal,Jerry Bruckheimer,David Beckham,Jessica Simpson,Andrew Lloyd Webber,LeBron James,Neil Diamond,Alex Rodriguez,Will Smith,Dick Wolf,Dave Matthews Band,Tom Brady,Ronaldinho,Jodie Foster,Ray Romano,Paris Hilton,Adam Sandler,Derek Jeter,Jennifer Lopez,Rick Warren,Scarlett Johansson,Katie Couric,Maria Sharapova,Valentino Rossi,Halle Berry,James Patterson,Leonardo DiCaprio,Kiefer Sutherland,Jim Carrey,Cameron Diaz,Gisele Bundchen,Renee Zellweger,Carson Palmer,Michelle Wie,Reese Witherspoon,Bill O\'Reilly,Kate Moss,Diane Sawyer,Sean (Diddy) Combs,John Grisham,Rachael Ray,Dave Chappelle,Larry the Cable Guy,Tyra Banks,George Lopez,Regis Philbin,Serena Williams,Ryan Seacrest,Wolfgang Puck,Venus Williams,Annika Sorenstam,Matthew Broderick/ Nathan Lane,Mel Brooks,Emeril Lagasse,Nicole Richie,Heidi Klum,Mario Batali,Eric Idle/ Mike Nichols,Adriana Lima,Ty Pennington'.split(',');
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
