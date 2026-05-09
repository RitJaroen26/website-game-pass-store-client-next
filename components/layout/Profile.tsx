"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/libs/api";

type StoredUser = {
  username?: string;
  email?: string;
};

type WalletResponse = {
  data?: {
    balance?: string | number;
  };
};


const transactions = [
  {
    id: "#GL-8832",
    game: "Cyber Hunter Elite",
    date: "24 Oct, 2023",
    status: "Completed",
    amount: "4,500 ฿",
    statusClass:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
  {
    id: "#GL-8831",
    game: "Neon Drifter Pack",
    date: "22 Oct, 2023",
    status: "Processing",
    amount: "1,250 ฿",
    statusClass: "border-[#007BFF]/20 bg-[#007BFF]/10 text-[#007BFF]",
  },
  {
    id: "#GL-8829",
    game: "Void Walker Skin",
    date: "18 Oct, 2023",
    status: "Completed",
    amount: "8,900 ฿",
    statusClass:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },
];

export default function Profile() {
  const [profileName, setProfileName] = useState("Pond Pawarit");
  const [profileEmail, setProfileEmail] = useState("loading...");
  const [balance, setBalance] = useState("0.00");

  useEffect(() => {
    let isActive = true;

    const loadProfile = async () => {
      if (typeof window === "undefined") return;

      await Promise.resolve();

      if (!isActive) return;

      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        window.location.href = '/login';
        return;
      }

      try {
        const user = JSON.parse(userStr) as StoredUser;
        setProfileName(user.username || user.email?.split("@")[0] || "Player");
        setProfileEmail(user.email || "ไม่พบอีเมล");
      } catch (error) {
        console.error("Failed to parse user data", error);
        return;
      }

      try {
        const response = (await api.get("/wallet")) as WalletResponse;

        if (response.data?.balance !== undefined) {
          setBalance(
            Number(response.data.balance).toLocaleString("th-TH", {
              minimumFractionDigits: 2,
            }),
          );
        }
      } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลยอดเงินได้:", error);
      }
    };

    loadProfile();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="relative z-10 mx-auto w-full max-w-[1280px] flex-grow px-4 pb-16 pt-28 text-[#e0e3e5] md:px-8">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute right-[-5%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[#007BFF] opacity-20 mix-blend-screen blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[#00dbe7] opacity-10 mix-blend-screen blur-[150px]" />
      </div>

      <header className="glass-panel relative z-10 mb-8 flex flex-col items-center gap-6 overflow-hidden rounded-2xl p-6 md:flex-row md:gap-8 md:p-8">
        <div className="glow-border relative shrink-0 rounded-full">
          <img
            alt="User Avatar"
            className="h-24 w-24 rounded-full border-4 border-[#020412] object-cover md:h-32 md:w-32"
            src="https://s.isanook.com/mv/0/ud/29/148323/sanook_6bb414e5ly1h8m9unjhvsj.jpg?ip/resize/w728/q80/jpg"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="mb-1 font-display text-3xl font-bold text-white md:text-4xl">
            {profileName}
          </h1>
          <p className="mb-4 text-sm text-on-surface-variant font-label-bold">
            {profileEmail}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <span className="flex items-center gap-1 rounded-full border border-[#00dbe7]/30 bg-[#00dbe7]/10 px-3 py-1 text-xs font-bold uppercase text-[#00dbe7] font-label-bold">
              <span className="material-symbols-outlined text-[14px]">
                stars
              </span>
              Elite Tier Collector
            </span>
            <span className="rounded-full border border-slate-800 bg-[#0a0f1c] px-3 py-1 text-sm text-on-surface-variant font-label-bold">
              ID: GL-99482A
            </span>
          </div>
        </div>

        <div className="w-full shrink-0 rounded-xl border border-[#414754] bg-[#0a0f1c]/80 p-5 text-center md:w-auto md:p-6 md:text-right">
          <p className="mb-1 text-xs uppercase tracking-wider text-on-surface-variant font-label-bold">
            ยอดเงินคงเหลือ
          </p>
          <p className="text-glow flex items-baseline justify-center gap-1 font-display text-3xl font-bold text-[#00dbe7] md:justify-end">
            ฿<span>{balance}</span>
          </p>
        </div>
      </header>

      <section className="relative z-10 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        <SummaryCard
          icon="shopping_cart"
          iconClass="bg-[#007BFF]/20 text-[#007BFF]"
          label="Total Purchases"
          value="2"
          tag="All Time"
        />
        <SummaryCard
          icon="local_offer"
          iconClass="bg-tertiary/20 text-tertiary"
          label="Your Basket"
          value="12"
          tag="Current"
        />
        <div className="glass-panel relative flex flex-col justify-between overflow-hidden rounded-xl p-5 transition-colors hover:border-emerald-500/50 md:p-6">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase text-on-surface-variant font-label-bold md:text-sm">
              Safety Performance
            </p>
            <div className="flex items-end gap-2">
              <p className="font-display text-3xl font-bold text-white">100</p>
              <p className="mb-1 text-sm text-emerald-400">/ 100</p>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" />
        </div>
      </section>

      <section className="relative z-10 grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="glass-panel rounded-xl p-6 xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white">
              <span className="material-symbols-outlined text-tertiary">
                receipt_long
              </span>
              ประวัติการสั่งซื้อ
            </h2>
            <button className="text-sm text-tertiary transition-all hover:underline font-label-bold">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#414754] text-xs uppercase tracking-wider text-on-surface-variant font-label-bold">
                  <th className="px-4 pb-3 font-semibold">Order ID</th>
                  <th className="px-4 pb-3 font-semibold">Game</th>
                  <th className="px-4 pb-3 font-semibold">Date</th>
                  <th className="px-4 pb-3 font-semibold">Status</th>
                  <th className="px-4 pb-3 text-right font-semibold">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-body-md">
                {transactions.map((transaction, index) => (
                  <tr
                    className={`transition-colors hover:bg-white/5 ${
                      index < transactions.length - 1
                        ? "border-b border-[#414754]/30"
                        : ""
                    }`}
                    key={transaction.id}
                  >
                    <td className="px-4 py-4 font-mono text-xs text-tertiary/80">
                      {transaction.id}
                    </td>
                    <td className="px-4 py-4 font-medium text-white">
                      {transaction.game}
                    </td>
                    <td className="px-4 py-4 text-xs text-on-surface-variant">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded border px-2 py-1 text-[10px] font-bold uppercase ${transaction.statusClass}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right font-display font-bold text-white">
                      {transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="glass-panel rounded-xl p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-white">
              <span className="material-symbols-outlined text-[#007BFF]">
                flash_on
              </span>
              Quick Actions
            </h2>
            <div className="space-y-3">
              <QuickAction
                description="ค้นหาไอเทมที่คุณต้องการ"
                href="/"
                icon="add_shopping_cart"
                iconClass="bg-[#007BFF]/20 text-[#007BFF] group-hover:bg-[#007BFF] group-hover:text-white"
                title="เลือกซื้อสินค้าเพิ่ม"
              />
              <QuickAction
                description="เพิ่มเครดิตเข้าระบบ"
                href="/TopUp"
                icon="payments"
                iconClass="bg-tertiary/20 text-tertiary group-hover:bg-tertiary group-hover:text-[#0a0f1c]"
                title="เติมเงิน"
              />
            </div>
          </div>

          <div className="glass-panel group relative flex min-h-[160px] cursor-pointer items-end overflow-hidden rounded-xl border border-transparent p-6 transition-all hover:border-[#007BFF]/50">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020412] to-transparent" />
              <div className="h-full w-full bg-[#007BFF]/30 blur-xl transition-all group-hover:bg-[#007BFF]/40" />
            </div>
            <div className="relative z-10 transition-transform group-hover:-translate-y-1">
              <span className="mb-2 inline-block rounded border border-tertiary/30 bg-tertiary/20 px-2 py-1 text-[10px] font-bold uppercase text-tertiary">
                New Event
              </span>
              <h3 className="mb-1 font-display text-lg font-bold text-white">
                Attack on Titan X ROV
              </h3>
              <p className="text-xs text-on-surface-variant">
                Earn 2x coupon 5/6/2026 - 25/7/2026
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function SummaryCard({
  icon,
  iconClass,
  label,
  tag,
  value,
}: {
  icon: string;
  iconClass: string;
  label: string;
  tag: string;
  value: string;
}) {
  return (
    <div className="glass-panel flex flex-col justify-between rounded-xl p-5 transition-colors hover:border-[#007BFF]/50 md:p-6">
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className="rounded bg-[#1d2022] px-2 py-1 text-xs text-on-surface-variant font-label-bold">
          {tag}
        </span>
      </div>
      <div>
        <p className="mb-1 text-xs uppercase text-on-surface-variant font-label-bold md:text-sm">
          {label}
        </p>
        <p className="font-display text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function QuickAction({
  description,
  href,
  icon,
  iconClass,
  title,
}: {
  description: string;
  href: string;
  icon: string;
  iconClass: string;
  title: string;
}) {
  return (
    <Link
      className="group flex w-full items-center justify-between rounded-xl border border-[#007BFF]/30 bg-[#0a0f1c] p-4 transition-all hover:border-[#007BFF] hover:bg-[#0f172a] hover:shadow-[0_0_15px_rgba(0,123,255,0.2)]"
      href={href}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${iconClass}`}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="mt-0.5 text-xs text-on-surface-variant">
            {description}
          </p>
        </div>
      </div>
      <span className="material-symbols-outlined text-on-surface-variant transition-colors group-hover:text-white">
        chevron_right
      </span>
    </Link>
  );
}
