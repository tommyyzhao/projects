import { readFile } from "fs/promises";
import path from "path";

const problem22 = async () => {
  const charCodeDifference = 64; // "A".charCodeAt(0) returns 65 and I want "A" to be 1

  try {
    const directory = path.join(
      process.cwd(),
      "src/serverFns/projectEuler/extraFiles/problem22_names.txt"
    );
    const names = await readFile(directory, "utf8");
    const nameArr = names.split(",").map((str) => str.split('"')[1]);
    const sortedArr = nameArr.sort();

    const sums = sortedArr.map(
      (name, index) =>
        name
          .split("")
          .map((char) => char.charCodeAt(0) - charCodeDifference)
          .reduce((acc, curr) => curr + acc, 0) *
        (index + 1)
    );

    return sums.reduce((acc, curr) => acc + curr, 0);
  } catch (e: any) {
    console.error(e);
  }
};

export default problem22;
