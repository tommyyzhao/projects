import path from "path";
import fs from "fs";

const getValidProblems = async (): Promise<
  [key: number, problemNumbers: number[]][]
> => {
  const problemsDirectory = path.join(__dirname, "../../server");

  try {
    const files = await fs.promises.readdir(problemsDirectory);
    const problems = files.filter((fileName) =>
      fileName.startsWith("src_serverFns_projectEuler_problems")
    );

    const problemNumbers = problems.map((problemName) => {
      const arr = problemName.split("_");
      // str = "problem#"
      const str = arr[arr.length - 2];
      return parseInt(str.split("problem")[1]);
    });

    const sortedProblemNumbers = problemNumbers.sort((a, b) => a - b);

    // groupings are by 10s, 1-10, 11-20, 21-30. Record is tens place => problems within the group
    const problemNumberRecord: Record<number, number[]> = {};

    sortedProblemNumbers.forEach((problemNumber) => {
      const roundUpToNearestTenthPlace = Math.ceil(problemNumber / 10) * 10;
      if (problemNumberRecord.hasOwnProperty(roundUpToNearestTenthPlace)) {
        problemNumberRecord[roundUpToNearestTenthPlace].push(problemNumber);
      } else {
        problemNumberRecord[roundUpToNearestTenthPlace] = [problemNumber];
      }
    });

    const entries = Object.entries(problemNumberRecord);
    const sortedEntries = entries.sort(
      ([keyA], [keyB]) => parseInt(keyA) - parseInt(keyB)
    );

    return sortedEntries.map(([key, problemNumbers]) => [
      parseInt(key),
      problemNumbers,
    ]);
  } catch (err) {
    console.error("Error occurred while reading directory!", err);
    return [];
  }
};

export default getValidProblems;
