import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/domain/queries/server-query-client";
import { GameClient } from "@/app/_components/game/game-client";
import { gameQuery } from "@/domain/queries/game-query";
import { withPrivatePage } from "@/app/_hoc/with-private-page";

type Params = { locale: string; id: string };
type Props = {
  params: Params;
};

async function GamePage(props: Props) {
  const { id, dehydratedState } = await useGamePage(props);

  return (
    <HydrationBoundary state={dehydratedState}>
      <GameClient id={id} />
    </HydrationBoundary>
  );
}

async function useGamePage({ params: { id } }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({ queryKey: gameQuery.key(id) });
  const dehydratedState = dehydrate(queryClient);

  return { id, dehydratedState };
}

export default withPrivatePage(GamePage);
