import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { HomeClient } from "@/app/_components/home/home-client";
import { getQueryClient } from "@/domain/queries/server-query-client";
import { gamesQuery } from "@/domain/queries/games-query";
import { withPrivatePage } from "@/app/_hoc/with-private-page";
import { GAMES_PER_PAGE_DEFAULT_OPTION } from "@/util/constants";

type Params = { locale: string };
type Props = {
  params: Params;
  searchParams: { [key: string]: string | undefined };
};

async function HomePage(props: Props) {
  const { dehydratedState } = await useHomePage(props);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeClient />
    </HydrationBoundary>
  );
}

async function useHomePage({ searchParams }: Props) {
  const { limit = GAMES_PER_PAGE_DEFAULT_OPTION, offset = undefined } =
    searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: gamesQuery.key({ limit, offset }),
  });
  const dehydratedState = dehydrate(queryClient);

  return { dehydratedState };
}

export default withPrivatePage(HomePage);
