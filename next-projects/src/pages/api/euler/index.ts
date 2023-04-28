// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
  runTime: number;
};

export default async function euler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let problemNumber = req.query.problemNumber || "0";
  if (Array.isArray(problemNumber)) {
    problemNumber = problemNumber.join("");
  }

  // import problem
  let problem: () => string = () => "";
  try {
    const folderName = getFolderName(problemNumber);
    const { default: importedProblem } = await import(
      `@/serverFns/projectEuler/problems/${folderName}`
    );
    problem = importedProblem;
  } catch (e) {
    res
      .status(500)
      .json({ answer: "Solution not yet implemented", runTime: 0 });
  }

  // run problem with error handling
  const startTime = Date.now();
  try {
    const answer = problem();
    const endTime = Date.now();

    return res.status(200).json({ answer, runTime: endTime - startTime });
  } catch (e) {
    return res
      .status(500)
      .json({ answer: `Error: ${e}`, runTime: Date.now() - startTime });
  }
}

const getFolderName = (s: string): string => {
  const n = parseInt(s);

  const roundUpToNearestTenthPlace = Math.ceil(n / 10) * 10;
  const roundUpToNearestHundrethPlace = Math.ceil(n / 100) * 100;

  const hundredFolderName = `problems${
    roundUpToNearestHundrethPlace - 99
  }-${roundUpToNearestHundrethPlace}`;
  const tensFolderName = `problems${
    roundUpToNearestTenthPlace - 9
  }-${roundUpToNearestTenthPlace}`;

  return `${hundredFolderName}/${tensFolderName}/problem${s}`;
};
