export type Tower = {
  name: string;
  price: string;
  damage: number;
  fireRate: number;
  range: number;
  targeting: "front" | "back" | "strong" | "close";
  imageSrc: string;
};
