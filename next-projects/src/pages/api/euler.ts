// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import problem1 from "@/serverFns/projectEuler/problems/problem1";
import problem10 from "@/serverFns/projectEuler/problems/problem10";
import problem2 from "@/serverFns/projectEuler/problems/problem2";
import problem3 from "@/serverFns/projectEuler/problems/problem3";
import problem4 from "@/serverFns/projectEuler/problems/problem4";
import problem5 from "@/serverFns/projectEuler/problems/problem5";
import problem6 from "@/serverFns/projectEuler/problems/problem6";
import problem7 from "@/serverFns/projectEuler/problems/problem7";
import problem8 from "@/serverFns/projectEuler/problems/problem8";
import problem9 from "@/serverFns/projectEuler/problems/problem9";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  answer: string;
  runTime: number;
};

export default function euler(req: NextApiRequest, res: NextApiResponse<Data>) {
  let problemNumber = req.query.problemNumber || "";
  if (Array.isArray(problemNumber)) {
    problemNumber = problemNumber.join("");
  }

  const startTime = Date.now();
  const answer = EulerProblems[parseInt(problemNumber) || 0]();
  const endTime = Date.now();

  res.status(200).json({ answer, runTime: endTime - startTime });
}

const EulerProblems: Record<number, () => string> = {
  1: problem1,
  2: problem2,
  3: problem3,
  4: problem4,
  5: problem5,
  6: problem6,
  7: problem7,
  8: problem8,
  9: problem9,
  10: problem10,
};
