import { GAMES_QUERY_KEY } from "./games-query";

export const gameQuery = {
  key: (id: string) => [`${GAMES_QUERY_KEY}/${id}`],
};
