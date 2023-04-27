import { ReactNode, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import runProblem from "../utils/runProblem";
import CardButton from "./CardButton";

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
    <CardButton onClick={handleButtonClick}>
      <Container>
        <Header>Problem #{problemNumber}</Header>
        <RunningContainer>
          {answer ? (
            <Answer>
              <div>
                <div>Answer:</div>
                <div style={{ marginTop: "8px" }}>{answer}</div>
              </div>
              <div>Server Runtime: {serverRunTime || 0}ms</div>
            </Answer>
          ) : totalRunTime ? (
            <div>Running: {totalRunTime || 0}ms</div>
          ) : (
            "Click to run"
          )}
        </RunningContainer>
      </Container>
    </CardButton>
  );
};

export default Problem;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const Header = styled.div`
  font-weight: 500;
  margin-top: 24px;
  font-size: 24px;
`;

const RunningContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  margin-top: 16px;
  margin-bottom: 16px;
`;

const Answer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
