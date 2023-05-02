const problem14 = () => {
  const getNumTerms = initializeCollatzSequence();

  let maxTerms = 0;
  let maxStartingNumber = 0;

  const largestNumber = 1000000;
  const smallestNumber = 13;
  for (let i = smallestNumber; i < largestNumber; i++) {
    const numTerms = getNumTerms(i);
    if (numTerms > maxTerms) {
      maxTerms = numTerms;
      maxStartingNumber = i;
    }
  }

  return `${maxStartingNumber}`;
};

export default problem14;

// returns num terms in collatz sequence
const initializeCollatzSequence = () => {
  // number => number of terms left in sequence
  const numTermsMap: Record<number, number> = {
    1: 1,
  };

  const getNumTerms = (n: number): number => {
    if (numTermsMap[n]) {
      return numTermsMap[n];
    }

    if (n % 2 === 0) {
      const numTerms = getNumTerms(n / 2) + 1;
      numTermsMap[n / 2] = numTerms;
      return numTerms;
    } else {
      const numTerms = getNumTerms(3 * n + 1) + 1;
      numTermsMap[3 * n + 1] = numTerms;
      return numTerms;
    }
  };

  return getNumTerms;
};
