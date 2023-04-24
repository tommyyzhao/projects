/*

A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

a^2 + b^2 = c^2
For example, 32 + 42 = 9 + 16 = 25 = 52.

There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.

*/

const problem9 = () => {
  // Upper bound on C is 500 because if C is 499, then 499^2 < 499^2 + 1^2
  const upperBound = 500;

  // Lower bound on C: lowest possible a^2 + b^2 is when a = b. a = b in a right triangle. a = d, b = d, c = d * sqrt(2).
  // combine that with a + b + c = 1000 and you get d + d + d * sqrt(2) = 1000. Solve for d is lower bound.
  const lowerBound = Math.floor(1000 / (2 + Math.sqrt(2)));

  for (let c = lowerBound; c < upperBound; c++) {
    for (let a = 1; a <= (1000 - c) / 2; a++) {
      const b = 1000 - c - a;

      const aSquared = Math.pow(a, 2);
      const bSquared = Math.pow(b, 2);
      const cSquared = Math.pow(c, 2);
      if (aSquared + bSquared === cSquared) {
        return a * b * c;
      }
    }
  }

  return "Not found";
};

export default problem9;
