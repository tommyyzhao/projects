const problem3 = () => {
  let maxNumber = 600851475143;

  // find largest prime factor of maxNumber
  const getNextPrime = getNextPrimeNumber();

  const primeFactors: number[] = [];

  let currPrime = getNextPrime(1);
  let index = 2;

  while (currPrime < maxNumber) {
    currPrime = getNextPrime(index);
    if (maxNumber % currPrime === 0) {
      primeFactors.push(currPrime);
      maxNumber = maxNumber / currPrime;
      // console.log("Found prime factor:", currPrime, "Leftover:", maxNumber);
      index = 2;
    } else {
      index++;
    }
  }

  // maxNumber is prime
  if (maxNumber !== 1 && primeFactors.length === 0) {
    return `${maxNumber}`;
  }

  // calculate largest primeFactor
  return `${Math.max(...primeFactors)}`;
};

export default problem3;

// returns the next prime number larger than the nthPrimeNumber (or 2) if none is given
export const getNextPrimeNumber = () => {
  const calculatedPrimeNumbers: number[] = [];

  return (nthPrimeNumber = 1) => {
    // memoize
    if (nthPrimeNumber - 2 < calculatedPrimeNumbers.length) {
      return calculatedPrimeNumbers[nthPrimeNumber - 2];
    }

    let currNumber = nthPrimeNumber;

    while (true) {
      let notPrime = false;
      for (let i = 0; i < calculatedPrimeNumbers.length; i++) {
        if (currNumber % calculatedPrimeNumbers[i] === 0) {
          // number is not prime
          notPrime = true;
          break;
        }
      }

      // skip to next iteration if number is not prime
      if (notPrime) {
        currNumber++;
        continue;
      }

      if (currNumber !== 1) {
        calculatedPrimeNumbers.push(currNumber);
      }

      return currNumber;
    }
  };
};
