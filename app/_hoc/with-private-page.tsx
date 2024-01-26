import { FC, ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/domain/auth";
import { redirect } from "@/navigation";
import { paths } from "@/navigation/paths";

type Props = {
  params: { locale: string; id: string };
  searchParams: { [key: string]: string | undefined };
  children: ReactNode;
};

export const withPrivatePage = (Component: FC<Props>) => {
  return async (props: Props) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect(paths.login());
    }
    return <Component {...props} />;
  };
};
