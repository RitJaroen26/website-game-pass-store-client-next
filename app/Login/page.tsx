import type { Metadata } from "next";
import Login from "@/components/layout/Login";

export const metadata: Metadata = {
  title: "GAMELORD - เข้าสู่ระบบ",
};

export default function LoginPage() {
  return <Login />;
}
