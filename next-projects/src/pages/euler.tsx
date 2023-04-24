import Problem from "@/components/EulerProject/Problem";
import problem1 from "@/components/EulerProject/problems/problem1";
import problem2 from "@/components/EulerProject/problems/problem2";
import problem3 from "@/components/EulerProject/problems/problem3";
import problem4 from "@/components/EulerProject/problems/problem4";
import problem5 from "@/components/EulerProject/problems/problem5";
import problem6 from "@/components/EulerProject/problems/problem6";
import problem7 from "@/components/EulerProject/problems/problem7";
import problem8 from "@/components/EulerProject/problems/problem8";
import problem9 from "@/components/EulerProject/problems/problem9";
import problem10 from "@/components/EulerProject/problems/problem10";
import { useState } from "react";
import styled from "styled-components";

const EulerProject = () => {
  const [runAll, setRunAll] = useState(false);

  return (
    <PageContainer>
      <ProblemContainer>
        <Problem problemNumber={1} runProblem={problem1} autoRun={runAll} />
        <Problem problemNumber={2} runProblem={problem2} autoRun={runAll} />
        <Problem problemNumber={3} runProblem={problem3} autoRun={runAll} />
        <Problem problemNumber={4} runProblem={problem4} autoRun={runAll} />
        <Problem problemNumber={5} runProblem={problem5} autoRun={runAll} />
        <Problem problemNumber={6} runProblem={problem6} autoRun={runAll} />
        <Problem problemNumber={7} runProblem={problem7} autoRun={runAll} />
        <Problem problemNumber={8} runProblem={problem8} autoRun={runAll} />
        <Problem problemNumber={9} runProblem={problem9} autoRun={runAll} />
        <Problem problemNumber={10} runProblem={problem10} autoRun={runAll} />
      </ProblemContainer>
      <button onClick={() => setRunAll(true)}>Run all</button>
    </PageContainer>
  );
};

export default EulerProject;

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
