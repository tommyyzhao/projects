import type { Tower } from "./Tower";

export type Cell = {
  imageSrc: string;
} & (
  | {
      type: "path" | "obstacle";
      tower?: never;
    }
  | {
      type: "placement";
      tower?: Tower;
    }
);
