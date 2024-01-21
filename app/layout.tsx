import { ReactNode } from "react";
import type { Metadata } from "next";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  manifest: "manifest.json",
};

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
