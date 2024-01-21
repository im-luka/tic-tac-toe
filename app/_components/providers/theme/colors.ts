import { MantineTheme, MantineColorsTuple } from "@mantine/core";

type ColorsType = { colors: Record<string, MantineColorsTuple> } & Pick<
  MantineTheme,
  "primaryColor" | "primaryShade" | "white" | "black"
>;

export const colors: ColorsType = {
  colors: {
    primary: [
      "#FAEAFF",
      "#EED2FD",
      "#D9A4F7",
      "#C371F1",
      "#B047ED",
      "#A52DEA",
      "#A01EEA",
      "#8B13D0",
      "#7C0CBB",
      "#6B03A4",
    ],
    neutral: [
      "#F3F3FE",
      "#E4E6ED",
      "#C8CAD3",
      "#A9ADBB",
      "#9093A4",
      "#808496",
      "#767C91",
      "#656A7E",
      "#585E72",
      "#4A5167",
    ],
    background: [
      "#767572",
      "#8F8F8B",
      "#AAAAA6",
      "#C5C5BF",
      "#E0E0DA",
      "#F7F7F3",
      "#F4F4F0",
      "#F1F1EC",
      "#EDEDE8",
      "#1D1D1B",
    ],
  },
  primaryColor: "primary",
  primaryShade: 5,
  white: "#FFFFFF",
  black: "#000000",
};
