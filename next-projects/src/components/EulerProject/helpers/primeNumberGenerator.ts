// calculates the nth prime number
export const primeNumberGenerator = () => {
  const calculatedPrimeNumbers: number[] = [];

  const findNextPrime = (startNumber: number) => {
    let currNumber = startNumber;
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

  return (nthPrimeNumber = 0) => {
    if (nthPrimeNumber < 1) {
      return -1;
    }
    // memoize
    if (nthPrimeNumber - 1 < calculatedPrimeNumbers.length) {
      return calculatedPrimeNumbers[nthPrimeNumber - 1];
    }

    while (calculatedPrimeNumbers.length < nthPrimeNumber) {
      const currNumber = calculatedPrimeNumbers.length
        ? calculatedPrimeNumbers[calculatedPrimeNumbers.length - 1]
        : 2;
      findNextPrime(currNumber);
    }

    return calculatedPrimeNumbers[calculatedPrimeNumbers.length - 1];
  };
};

export default primeNumberGenerator;
