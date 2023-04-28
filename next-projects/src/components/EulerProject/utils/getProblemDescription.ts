import axios from "axios";

const getProblemDescription = async (problemNumber: number) => {
  try {
    const response = await axios.get(
      `/api/euler/get-problem-description?problemNumber=${problemNumber}`
    );
    return { problemDescription: response.data.problemDescription as string };
  } catch ({ response }: any) {
    return { problemDescription: response.data.problemDescription as string };
  }
};

export default getProblemDescription;
