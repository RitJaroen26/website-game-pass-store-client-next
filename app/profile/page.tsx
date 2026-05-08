import type { Metadata } from "next";
import Profile from "@/components/layout/Profile";

export const metadata: Metadata = {
  title: "GAMELORD - User Profile",
};

export default function ProfilePage() {
  return <Profile />;
}
