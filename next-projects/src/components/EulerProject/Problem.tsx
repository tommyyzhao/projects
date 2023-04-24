import { ReactNode, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  problemNumber: number;
  runProblem: () => ReactNode;
  autoRun: boolean;
};

const Problem = ({ problemNumber, runProblem, autoRun }: Props) => {
  const [answer, setAnswer] = useState<ReactNode>();
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();

  useEffect(() => {
    if (answer) {
      setEndTime(Date.now());
    }
  }, [answer]);

  const handleButtonClick = useCallback(() => {
    setStartTime(Date.now());
    const ans = runProblem();
    setAnswer(ans);
  }, [runProblem]);

  useEffect(() => {
    if (autoRun) {
      handleButtonClick();
    }
  }, [autoRun, handleButtonClick]);

  return (
    <Container>
      <div>Problem #{problemNumber}:</div>
      <button onClick={handleButtonClick}>Run</button>
      <div>Ans: {answer}</div>
      <div>Runtime: {endTime && startTime ? endTime - startTime : 0}ms</div>
    </Container>
  );
};

export default Problem;

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 24px;
`;
