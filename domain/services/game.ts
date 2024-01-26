import { Game } from "@/types/game";
import { remoteApi } from "../remote";
import { getAxiosData } from "../remote/response/data";
import { MoveGameData } from "../types/move-game";

const create = () => remoteApi.post("games/").then(getAxiosData<Game>);

const join = (id: number) =>
  remoteApi.post(`games/${id}/join/`).then(getAxiosData);

const move = ({ id, ...data }: MoveGameData) =>
  remoteApi.post(`games/${id}/move/`, data).then(getAxiosData);

export const gameService = {
  create,
  join,
  move,
};
