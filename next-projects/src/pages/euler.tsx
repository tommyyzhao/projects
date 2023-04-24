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
          <Problem problemNumber={1} autoRun={runAll} />
          <Problem problemNumber={2} autoRun={runAll} />
          <Problem problemNumber={3} autoRun={runAll} />
          <Problem problemNumber={4} autoRun={runAll} />
          <Problem problemNumber={5} autoRun={runAll} />
          <Problem problemNumber={6} autoRun={runAll} />
          <Problem problemNumber={7} autoRun={runAll} />
          <Problem problemNumber={8} autoRun={runAll} />
          <Problem problemNumber={9} autoRun={runAll} />
          <Problem problemNumber={10} autoRun={runAll} />
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
