import { useEffect, useState } from "react";
import getProblemDescription from "../utils/getProblemDescription";

type Props = {
  problemNumber: number;
  showProblems: () => void;
};

const ProblemDetails = ({ problemNumber, showProblems }: Props) => {
  const [problemDescription, setProblemDescription] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { problemDescription: pd } = await getProblemDescription(
        problemNumber
      );
      setProblemDescription(pd);
    })();
  }, [problemNumber]);

  return (
    <>
      <button onClick={showProblems}>Go back</button>
      <div dangerouslySetInnerHTML={{ __html: problemDescription }} />
    </>
  );
};

export default ProblemDetails;
