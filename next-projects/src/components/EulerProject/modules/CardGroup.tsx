import CardButton from "./CardButton";

type Props = {
  tensPlace: number;
  onClick: () => void;
};

const CardGroup = ({ tensPlace, onClick }: Props) => {
  return (
    <CardButton onClick={onClick}>
      Problems {tensPlace - 9}-{tensPlace}
    </CardButton>
  );
};

export default CardGroup;
