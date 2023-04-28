import { getNextPrimeNumber } from "./problem3";
// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

const problem5 = () => {
  return `${katherinesSmartAlgorithm(20)}`;
  // return bruteForceAlgorithm();
};

export default problem5;

// calculates from 1 to n
const katherinesSmartAlgorithm = (n: number) => {
  // reduce to prime factors
  const getPrimeNumber = getNextPrimeNumber();
  // take the greatest quantity of each prime factor and multiply them together
  const totalPrimeFactors: Record<number, number> = {};

  for (let i = 1; i <= n; i++) {
    const currPrimeFactors = findPrimeFactors(i, getPrimeNumber);
    const entries = Object.entries(currPrimeFactors);
    entries.forEach(([key, value]) => {
      if (totalPrimeFactors.hasOwnProperty(key)) {
        totalPrimeFactors[parseInt(key)] = Math.max(
          value,
          totalPrimeFactors[parseInt(key)]
        );
      } else {
        totalPrimeFactors[parseInt(key)] = value;
      }
    });
  }

  const entries = Object.entries(totalPrimeFactors);
  let total = 1;
  for (let i = 0; i < entries.length; i++) {
    const [base, power] = entries[i];
    total = total * Math.pow(parseInt(base), power);
  }

  return total;
};

const findPrimeFactors = (n: number, getNextPrime: (n: number) => number) => {
  let currNumber = n;
  let currPrime = getNextPrime(1);
  let index = 1;

  const primeFactors: number[] = [];

  while (currNumber > 1) {
    currPrime = getNextPrime(index);
    if (currPrime > currNumber) {
      throw new Error("Error with prime numbers");
    }
    if (currNumber % currPrime === 0) {
      primeFactors.push(currPrime);
      currNumber = currNumber / currPrime;
      index = 1;
    }
    index++;
  }

  // turn into a record
  const primeFactorRecord: Record<number, number> = {};

  for (let i = 0; i < primeFactors.length; i++) {
    const primeFactor = primeFactors[i];
    if (primeFactorRecord.hasOwnProperty(primeFactor)) {
      primeFactorRecord[primeFactor] += 1;
    } else {
      primeFactorRecord[primeFactor] = 1;
    }
  }

  return primeFactorRecord;
};

export const bruteForceAlgorithm = () => {
  const smallestNumberDivisbleThrough10 = 2520;

  let counter = smallestNumberDivisbleThrough10;

  while (true) {
    // if (counter % 10000 === 0) {
    //   console.log(counter);
    // }
    if (isDivisibleByNums(counter)) {
      return counter;
    }

    counter++;
  }
};

const isDivisibleByNums = (n: number): boolean => {
  const nums = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  2 * 3 * 2 * 5 * 7 * 2 * 3 * 11 * 13 * 2 * 17 * 19;

  /*
    // get rid of numbers that are factors of bigger ones
    20: 2 & 5 & 10
    18: 9 & 2
    16: 8 & 2 & 4
    15: 3 & 5
    14: 7 & 2
    12: 6 & 2
  */

  const bools = nums.map((factor) => n % factor === 0);
  if (bools.includes(false)) {
    return false;
  }

  return true;
};
