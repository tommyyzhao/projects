import { useState } from "react";
import Problem from "./Problem";
import styled from "styled-components";
import ProblemDetails from "./ProblemDetails";

type Props = {
  problemNumbers: number[];
  resetProblemGroup: () => void;
};

const DisplayProblems = ({ problemNumbers, resetProblemGroup }: Props) => {
  const [autoRun, setAutoRun] = useState(false);
  const [problemDetailsNumber, setProblemDetailsNumber] = useState<number>();

  if (problemDetailsNumber) {
    return (
      <ProblemDetails
        problemNumber={problemDetailsNumber}
        showProblems={() => setProblemDetailsNumber(undefined)}
      />
    );
  }

  return (
    <div>
      <ButtonContainer>
        <button onClick={resetProblemGroup}>Back to problems</button>
        <button onClick={() => setAutoRun(true)}>Run All</button>
      </ButtonContainer>
      <ProblemContainer>
        {problemNumbers.map((problemNumber, index) => (
          <Problem
            key={`problem-${index}`}
            problemNumber={problemNumber}
            autoRun={autoRun}
            showProblemDetails={() => setProblemDetailsNumber(problemNumber)}
          />
        ))}
      </ProblemContainer>
    </div>
  );
};
export default DisplayProblems;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProblemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 24px;
  row-gap: 24px;
  margin-top: 48px;
`;
