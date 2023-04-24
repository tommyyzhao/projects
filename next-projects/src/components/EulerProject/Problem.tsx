import { ReactNode, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import runProblem from "./runProblem";

type Props = {
  problemNumber: number;
  autoRun: boolean;
};

const Problem = ({ problemNumber, autoRun }: Props) => {
  const [answer, setAnswer] = useState<ReactNode>();
  const [totalRunTime, setTotalRunTime] = useState<number>();
  const [serverRunTime, setServerRunTime] = useState<number>();

  const handleButtonClick = useCallback(async () => {
    const startTime = Date.now();
    const intervalId = setInterval(() => {
      setTotalRunTime(Date.now() - startTime);
    }, 100);

    const { ans, serverRunTime } = await runProblem(problemNumber);

    clearInterval(intervalId);
    setServerRunTime(serverRunTime);
    setAnswer(ans);
  }, [problemNumber]);

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
      <div>Total Runtime: {totalRunTime || 0}ms</div>
      <div>Server Runtime: {serverRunTime || 0}ms</div>
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
