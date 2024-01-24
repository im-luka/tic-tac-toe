import { stringify } from "querystring";
import { omitBy, isNil } from "lodash";

const GAMES_QUERY_KEY = "games";

export const gamesQuerySearchParams = {
  limit: "limit",
  offset: "offset",
} as const;
type GamesQueryParams = {
  [key in keyof typeof gamesQuerySearchParams]?: string;
};

export const gamesQuery = {
  key: (params?: GamesQueryParams) => {
    const queryParams = stringify(omitBy(params, isNil));
    const query = queryParams ? `?${queryParams}` : null;
    return [GAMES_QUERY_KEY, query];
  },
};
