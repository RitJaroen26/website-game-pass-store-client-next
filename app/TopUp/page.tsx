import type { Metadata } from "next";
import WalletTopUpPage from "@/features/wallet/WalletTopUpPage";

export const metadata: Metadata = {
  title: "GAMELORD - เติมเงิน",
  description: "เติมเครดิตบัญชี GAMELORD ด้วย PromptPay QR",
};

export default function TopUpPage() {
  return <WalletTopUpPage />;
}
