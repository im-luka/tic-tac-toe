import { FC } from "react";
import { useSession } from "next-auth/react";
import { IconCircle, IconX } from "@tabler/icons-react";

type Props = {
  value: number | null;
};

export const BoardGameIcon: FC<Props> = (props) => {
  const { value, isAuthUser } = useBoardGameIcon(props);

  if (!value) {
    return;
  }

  if (isAuthUser) {
    return <IconCircle size={72} color="var(--mantine-color-primary-9)" />;
  }

  return <IconX size={72} color="var(--mantine-color-primary-2)" />;
};

function useBoardGameIcon({ value }: Props) {
  const { data } = useSession();
  const { id } = data?.user ?? {};
  const isAuthUser = value && id && value === id;

  return { value, isAuthUser };
}
