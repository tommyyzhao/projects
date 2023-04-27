import { useState } from "react";
import Problem from "./Problem";
import styled from "styled-components";

type Props = {
  problemNumbers: number[];
  resetProblemGroup: () => void;
};

const DisplayProblems = ({ problemNumbers, resetProblemGroup }: Props) => {
  const [autoRun, setAutoRun] = useState(false);

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
