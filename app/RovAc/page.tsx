import type { Metadata } from "next";
import RovMarketplace from "@/features/marketplace/RovMarketplace";

export const metadata: Metadata = {
  title: "GAMELORD - ROV Accounts",
  description: "Browse verified Arena of Valor accounts.",
};

export default function RovAccountsPage() {
  return <RovMarketplace />;
}
