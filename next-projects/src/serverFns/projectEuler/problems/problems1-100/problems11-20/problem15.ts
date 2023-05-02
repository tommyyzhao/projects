/*
 * 3 x 3 grid representing number of choices
 *
 * 20 - 10 - 4 - -
 * |    |    |   |
 * 10 - 6  - 3 - -
 * |    |    |   |
 * 4  - 3  - 2 - -
 * |    |  - |   |
 * -  - -  - - - -
 *
 */

const problem15 = () => {
  const squareGridLength = 3;
  const length = squareGridLength - 1;

  let prevRow = Array.from({ length: length + 1 }, (_, i) => i + 2); // 2 - (length + 1)

  for (let i = 1; i < length; i++) {
    const startingVal = i + 2;
    const currentRow: number[] = [startingVal];
    for (let j = 1; j < prevRow.length; j++) {
      currentRow.push(prevRow[j] + currentRow[j - 1]);
    }
    prevRow = currentRow;
  }

  return prevRow[prevRow.length - 1] * 2;
};

export default problem15;
