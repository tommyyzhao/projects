import { readFile } from "fs/promises";
import path from "path";

const problem67 = async () => {
  try {
    const directory = path.join(
      process.cwd(),
      "src/serverFns/projectEuler/extraFiles/problem67_triangle.txt"
    );
    const triangle = await readFile(directory, "utf8");

    const triangleArr = triangle.split("\n");

    let prevRow = triangleArr[triangleArr.length - 1].trim().split(" ");
    // start from the bottom and work up
    for (let i = triangleArr.length - 2; i >= 0; i--) {
      const currRow = triangleArr[i].trim().split(" ");

      // gonig throw each row
      for (let j = 0; j < currRow.length; j++) {
        currRow[j] = `${
          parseInt(currRow[j]) +
          Math.max(parseInt(prevRow[j]), parseInt(prevRow[j + 1]))
        }`;
      }
      prevRow = currRow;
    }

    return prevRow[0];
  } catch (e: any) {
    console.error(e);
  }
};

export default problem67;
