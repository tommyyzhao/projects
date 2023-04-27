const problem1 = () => {
  let total = 0;
  const recordNums: Record<number, boolean> = {};

  for (let i = 3; i < 1000; i += 3) {
    const num = i;
    if (!recordNums.hasOwnProperty(num)) {
      recordNums[num] = true;
      total += num;
    }
  }

  for (let i = 5; i < 1000; i += 5) {
    const num = i;
    if (!recordNums.hasOwnProperty(num)) {
      recordNums[num] = true;
      total += num;
    }
  }

  return `${total}`;
};

export default problem1;
