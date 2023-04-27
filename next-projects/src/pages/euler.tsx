import Problem from "@/components/EulerProject/Problem";
import { useState } from "react";
import styled from "styled-components";
import Navbar from "@/components/Navbar";

const EulerProject = () => {
  const [runAll, setRunAll] = useState(false);

  return (
    <>
      <Navbar />
      <PageContainer>
        <Header>Project Euler:</Header>
        <ProblemContainer>
          {[...Array(10).keys(), 141].map((i) => (
            <Problem
              key={`problem-number-${i}`}
              problemNumber={i + 1}
              autoRun={runAll}
            />
          ))}
        </ProblemContainer>
        <button onClick={() => setRunAll(true)}>Run all</button>
      </PageContainer>
    </>
  );
};

export default EulerProject;

const Header = styled.div`
  font-size: 48px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  row-gap: 48px;
`;

const ProblemContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;
