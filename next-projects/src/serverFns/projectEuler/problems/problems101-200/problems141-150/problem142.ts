/*
Problem: Find the smallest x + y + z with integers x > y > z > 0 such that x + y, x − y, x + z, x − z, y + z, y − z are all perfect squares.
x  =    3      4           5
x + y, [5]  [6, 7]     [7, 8, 9]
x − y, [1]  [1, 2]     [1, 2, 3]
x + z, [4]  [5, 6]     [6, 7, 8]
x − z, [2]  [2, 3]     [2, 3, 4]
y + z, [3]  [3, 4, 5]  [3, 4, 5, 6, 7]
y − z, [1]  [1, 2]     [1, 2, 3]
1. Perfect squares will never be consecutive because the difference between perfect squares is 2n + 3, n >= 0.
2. For x = 3, we need the following numbers to be perfect squares, 5       ,  1,       4,        2, 3, 1.
3. For x = 4, we need the following numbers to be perfect squares, (6 or 7), (2 or 3), (5 or 6), ()
3. For any x, we will have to check if n is a perfect square where n = 2x + 3
4. x + y - (x - y) = 2y => must be even.
*/

const problem142 = () => {
  let x = 4;

  // there is a lower bound for this
  let xPlusY: number[] = [];

  while (true) {
    const newNumbers = [2 * x - 1, 2 * x - 2]; // these are the new ones for x + y

    if (isPerfectSquare(newNumbers[0])) {
      xPlusY.push(newNumbers[0]);
    }

    if (isPerfectSquare(newNumbers[1])) {
      xPlusY.push(newNumbers[1]);
    }

    let numToRemove = 0;

    for (let i = 0; i < xPlusY.length; i++) {
      if (x + 1 >= xPlusY[i]) {
        numToRemove++;
        continue;
      }

      const ans = checkForPerfectSquares(x, xPlusY[i]);
      if (ans) {
        return `${ans.x + ans.y + ans.z}`;
      }
    }

    xPlusY = xPlusY.slice(numToRemove);

    x++;
  }
};

export default problem142;

const isPerfectSquare = (n: number): boolean => {
  return Number.isInteger(Math.sqrt(n));
};

const checkForPerfectSquares = (
  x: number,
  xPlusY: number
): { x: number; y: number; z: number } | false => {
  const y = xPlusY - x;
  const xMinusY = x - y;

  if (((xPlusY - xMinusY) / 2) % 2 === 0 && isPerfectSquare(x - y)) {
    // possible shortcut here the same way i did with x and y ( just last 2)
    for (let z = 1; z < y; z++) {
      if (
        isPerfectSquare(x + z) &&
        isPerfectSquare(x - z) &&
        isPerfectSquare(y - z) &&
        isPerfectSquare(y + z)
      ) {
        return { x, y, z };
      }
    }
  }

  return false;
};
