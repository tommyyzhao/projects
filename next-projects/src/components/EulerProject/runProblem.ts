import axios from "axios";

const runProblem = async (problemNumber: number) => {
  try {
    const response = await axios.get(
      `/api/euler?problemNumber=${problemNumber}`
    );
    return { ans: response.data.answer, serverRunTime: response.data.runTime };
  } catch ({ response }: any) {
    return { ans: response.data.answer, serverRunTime: response.data.runTime };
  }
};

export default runProblem;
