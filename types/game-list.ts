import { Game } from "./game";

export type GameList = {
  count: number;
  next: string;
  previous: string;
  results: Game[];
};
