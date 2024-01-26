import { User } from "./user";

export type GameUser = Pick<User, "id" | "username">;

export enum GameStatus {
  Open = "open",
  Progress = "progress",
  Finished = "finished",
}

export type Game = {
  id: number;
  board: (number | null)[][];
  winner: GameUser;
  first_player: GameUser;
  second_player: GameUser;
  created: Date | string;
  status: GameStatus;
};
