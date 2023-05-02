const problem21 = () => {
  const amicableNumbers: number[] = [];

  // sum => i[]
  const amicableNumberMap: Record<number, number[]> = {};

  for (let i = 1; i < 10000; i++) {
    let sumOfCompositeNumbers = 0;
    for (let j = 1; j < i; j++) {
      if (i % j === 0) {
        sumOfCompositeNumbers += j;
      }
    }

    // i = 220, sum = 284. I set map[284] = 220; Then, when i = 284, I need to check map[i] to see if it === sum
    // does the map include i.
    if (amicableNumberMap.hasOwnProperty(i)) {
      const possibleAmicableNumbers = amicableNumberMap[i];
      // If so, check if i is in the array.
      if (possibleAmicableNumbers.includes(sumOfCompositeNumbers)) {
        amicableNumbers.push(i);
        amicableNumbers.push(sumOfCompositeNumbers);
      }
    }

    // add ours to the list
    if (amicableNumberMap.hasOwnProperty(sumOfCompositeNumbers)) {
      amicableNumberMap[sumOfCompositeNumbers].push(i);
    } else {
      amicableNumberMap[sumOfCompositeNumbers] = [i];
    }
  }

  return amicableNumbers.reduce((acc, curr) => acc + curr, 0);
};

export default problem21;
