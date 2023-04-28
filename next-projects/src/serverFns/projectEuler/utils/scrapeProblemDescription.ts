import axios from "axios";

const scrapeProblemDescription = async (
  problemNumber: number
): Promise<string> => {
  const pageContent = await axios.get(
    `https://projecteuler.net/problem=${problemNumber}`
  );

  return getFirstNodeByClassName({
    html: pageContent.data,
    className: "problem_content",
  });
};

export default scrapeProblemDescription;

type GetNodeByClassnameProps = {
  html: string;
  className: string;
};

// returns a stringified node of the first element with the specified class name
const getFirstNodeByClassName = ({
  html,
  className,
}: GetNodeByClassnameProps) => {
  const arr = html.split(`class="${className}"`);

  // Does not exist
  if (arr.length < 2) {
    return "";
  }

  const nodeType = getNodeType(arr[0]);
  return getNode({ html: arr[1], nodeType });
};

const getNode = ({ html, nodeType }: { html: string; nodeType: string }) => {
  let nodeStartIndex = 0;
  for (let i = 0; i < html.length; i++) {
    if (html[i] === ">") {
      nodeStartIndex = i + 1;
      break;
    }
  }

  const htmlAtCorrectStart = html.slice(nodeStartIndex);
  const nodeWithWhiteSpace = htmlAtCorrectStart.split(`</${nodeType}>`);
  return nodeWithWhiteSpace[0].trim();
};

const getNodeType = (str: string) => {
  let startTagDelimiterIndex = 0;

  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === "<") {
      startTagDelimiterIndex = i;
      break;
    }
  }

  let tag: string = "";

  for (let i = startTagDelimiterIndex + 1; i < str.length; i++) {
    if (str[i] !== " ") {
      tag += str[i];
    }
  }

  return tag;
};
