import type { Metadata } from "next";
import Checkout from "@/components/layout/Checkout";

export const metadata: Metadata = {
  title: "GAMELORD - Checkout",
};

export default function CheckoutPage() {
  return <Checkout />;
}
