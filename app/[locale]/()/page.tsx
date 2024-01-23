import { HomeClient } from "@/app/_components/home/home-client";
import { withPrivatePage } from "@/app/_hoc/with-private-page";

function HomePage() {
  return <HomeClient />;
}

export default withPrivatePage(HomePage);
