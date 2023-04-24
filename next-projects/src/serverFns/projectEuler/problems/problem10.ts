/*

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.

*/

import primeNumberGenerator from "../helpers/primeNumberGenerator";

const problem10 = () => {
  const twoMillion = 2000000;

  let sum = 0;
  let nthPrime = 1;
  let currPrime = 0;

  const getNthPrime = primeNumberGenerator();

  while (currPrime < twoMillion) {
    sum += currPrime;
    currPrime = getNthPrime(nthPrime);
    nthPrime++;
  }

  return `${sum}`;
};

export default problem10;
