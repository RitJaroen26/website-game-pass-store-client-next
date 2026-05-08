"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Account = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  price: number;
  rank: string;
  statLabel: string;
  statValue: string;
  heroes: number;
  badge?: string;
  badgeClass?: string;
  metaIcon?: string;
  metaText?: string;
  featured?: boolean;
};

const ranks = [
  "Eternal Legend",
  "Conqueror",
  "Grand Conqueror",
  "Master",
  "Diamond",
  "Platinum",
];

const heroFilters = [
  { label: "50+", value: 50 },
  { label: "80+", value: 80 },
  { label: "100+", value: 100 },
  { label: "All Heroes", value: 0 },
];

// Mock marketplace data. Later this can be replaced with API data from the backend.
const accounts: Account[] = [
  {
    id: "ROV-1001",
    title: "ID เข้าใหม่สะอาด B",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDJy3A5ultfOyU2jtwImip2foOByWCtzexQ&s",
    imageAlt:
      "cinematic action shot of a powerful armored warrior character from a mobile battle arena game with magical blue energy effects",
    price: 50,
    rank: "Master",
    statLabel: "Minimum Skins",
    statValue: "69-380 Skins",
    heroes: 69,
    badge: "Featured",
    badgeClass: "bg-yellow-500 text-slate-950",
    metaIcon: "verified",
    metaText: "Verified Seller",
    featured: true,
  },
  {
    id: "ROV-1002",
    title: "ID งานคัด Winrate อัตราชนะขั้นต่ำ 68%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEvwvRgpBfOgZN8q4iPq4cXz0-iA2DagmV-r-aFd1qOVY9P0cdlPxEwFRlqMs2kkl4Xg5v6gaKF_rW1LQxcURZpOXA-c4ST1MdWP8QE8KfcR9qwM3Hv8M3JRAAnpAy3xXJAteDl-6N3VxuTJp_FwsiLHus7WHkxs2kRchETHRz7ofyhyFdLnuAbWHK7uEV0uu9Kls2OLRT7n1xM3b_nHoIyK0K35d3qJvH6jlUZhZNyXiiQaZe3LhNMOUwbO9Mx7t93tzUJOYIht8A",
    imageAlt:
      "mystical female mage character casting ice spells in a dark enchanted forest with glowing cyan and violet particles",
    price: 199,
    rank: "Eternal Legend",
    statLabel: "Win Rate",
    statValue: "68.4%",
    heroes: 150,
    metaIcon: "schedule",
    metaText: "2 Hours ago",
  },
  {
    id: "ROV-9921",
    title: "Master Tier Smurf | Full Arcanas | Cheap",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCR5stFO2okIdZRTx6QFHtfWv5z3sCM6SyEWjpMA7wcAix1FytngiXOSdoeffVZZ12C17n1i6lQW1kYllvIKP3KtoYFFNMw8GqYHzyHxrXz4nyCy_9TxQBPwqgloTF7BTem2SCUX7Cb3zA73FAwzTlOB_rzqocjq8zHgMF6s05cGUrmeFrUO_dp122jCV3sOAIqYJ-ySzYXrir7tolz8wsGMCR28Xe5GO1_yWMFBYgyEl6ICvoTqlJZtqBiJ8wZvJMTxcPuPLgcCQRR",
    imageAlt:
      "close-up of a high-tech robotic assassin character with neon red glowing eyes and sleek black metal armor surfaces",
    price: 2450,
    rank: "Master",
    statLabel: "Arcana Level",
    statValue: "Level 90",
    heroes: 105,
    metaIcon: "person_pin",
    metaText: "ID: #ROV-9921",
  },
  {
    id: "ROV-1004",
    title: "Conqueror Peak Rank | 95 Heroes | Rare Skins",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiJEQZznMsA-9_Y5aC-92h0pCk-fHuDHgMFenfQ1WJhCch51WtEYPyK44fk-shhYZk0i_qc8-R4uldwL-ydsmq4D4r1Dr4cEbtTVns6dmd0m3O9Tcd29c5GBRVWTtRnISHiz9NuGbuFKztZvKsxnLO9J0HAd2mOnLjQ1n4hDvQaGwKmGRAdNiylxhKeKXv2ORhtUnwE8oBor6ARlhRSbkotOeHZflVdlOBoyuyZVX2Pj2s0D7p_vcpv6gn27uoyJXENa3pklyJCV07",
    imageAlt:
      "dynamic battle scene with a dragon-themed warrior unleashing a fire breath attack with orange and yellow ember effects",
    price: 8900,
    rank: "Diamond",
    statLabel: "Heroes",
    statValue: "95 Heroes",
    heroes: 95,
    metaIcon: "star",
    metaText: "Best Value",
  },
  {
    id: "ROV-1005",
    title: "Special Edition Skins | Collector Account",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8seEt-p4-R0B2oOjH4Ikjcq7FflCWO-k1fHg8TWUWK8NN3LyajrjtTYVmQovrRL3kK2BfMiW-gUdklVM8oZiDuKOqBGwCFufmtbbxYZV3bP9oQywnxPk4az2i3vZi7TAmZxKSjm6xmOzYIZhPHF2nfWRJGqfpwlVuDO8oclsh8GMCAby8TuNwmo6RJYir-LA1BEmbQcZIpjz5gt3DxqGv9PbW-Oei5NMLGSWZURPtEWjRNtAsOlZqwQJtqfqA66hzrYodM_y6OaCJ",
    imageAlt:
      "ethereal celestial landscape with a floating hero character surrounded by orbiting planets and glowing stardust trails",
    price: 12000,
    rank: "Platinum",
    statLabel: "Skins",
    statValue: "150+ Skins",
    heroes: 80,
    badge: "New Listed",
    badgeClass: "bg-cyan-500 text-slate-950",
  },
  {
    id: "ROV-1006",
    title: "High Winrate ADC Main | Master 25 Stars",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmDSuHRELIeOTB--surpczp0BEoYq1L1w5SdEiR33sgyRxOBCNcUBuY_FYAE3VFXqkNjbaJLs57DBFXWi9kguaA4XQMJKrW6BTAEhSBMjyGxZ0YyuK3qI3qHcscr8-jGAF0gjVoUvutRVc_mJW2XTCN5TSUvZuLhUpOepjiMGLnSTo7kwsaYDHyyWyhWl6qnCoIl9u9HCQ1yurdKUtgfgE1VjAB37_dlKSWqtMdeVu2eL2vntKj2yJal6fvEk_4QePalMHmDY6bDur",
    imageAlt:
      "cyberpunk stylized archer character with holographic bow and arrow standing on a rain-slicked futuristic street",
    price: 5800,
    rank: "Master",
    statLabel: "Win Rate",
    statValue: "72%",
    heroes: 105,
  },
];

const currency = new Intl.NumberFormat("th-TH");

export default function RovMarketplace() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const [selectedHeroCount, setSelectedHeroCount] = useState(0);
  const [sortBy, setSortBy] = useState("latest");

  // Keep filtering derived from state so the UI updates immediately when controls change.
  const filteredAccounts = useMemo(() => {
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Infinity;

    return accounts
      .filter((account) => {
        const priceMatch = account.price >= min && account.price <= max;
        const rankMatch =
          selectedRanks.length === 0 || selectedRanks.includes(account.rank);
        const heroMatch = account.heroes >= selectedHeroCount;

        return priceMatch && rankMatch && heroMatch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "heroes") return b.heroes - a.heroes;

        return (
          accounts.findIndex((account) => account.id === a.id) -
          accounts.findIndex((account) => account.id === b.id)
        );
      });
  }, [maxPrice, minPrice, selectedHeroCount, selectedRanks, sortBy]);

  const toggleRank = (rank: string) => {
    setSelectedRanks((current) =>
      current.includes(rank)
        ? current.filter((item) => item !== rank)
        : [...current, rank],
    );
  };

  // Restore the marketplace to its default unfiltered view.
  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedRanks([]);
    setSelectedHeroCount(0);
    setSortBy("latest");
  };

  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-4 pb-xl pt-32 text-white md:px-8">
      <section className="mb-lg">
        <div className="mb-4 flex items-center gap-4">
          <span className="rounded border border-tertiary/30 bg-tertiary/20 px-3 py-1 font-label-bold text-xs uppercase tracking-widest text-tertiary">
            Premium Category
          </span>
          <div className="h-px flex-grow bg-gradient-to-r from-tertiary/50 to-transparent" />
        </div>
        <h1 className="mb-2 font-display text-4xl font-bold text-white md:text-display">
          Arena of Valor (ROV)
        </h1>
        <p className="max-w-2xl font-body-lg text-slate-100">
          Browse the most prestigious ROV accounts across all servers. Verified
          rankings, rare skins, and high-winrate masters.
        </p>
      </section>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full flex-shrink-0 space-y-6 lg:w-72">
          <section className="glass-card rounded-xl p-6">
            <h2 className="mb-6 flex items-center gap-2 font-headline-md text-white">
              <span className="material-symbols-outlined text-tertiary">
                filter_list
              </span>
              Filters
            </h2>

            <div className="mb-8">
              <label className="mb-4 block font-label-bold text-xs uppercase tracking-widest text-slate-500">
                Price Range (฿)
              </label>
              <div className="mb-4 flex items-center gap-2">
                <input
                  className="w-full rounded border border-white/10 bg-surface-container-lowest p-2 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-tertiary focus:ring-0"
                  min="0"
                  onChange={(event) => setMinPrice(event.target.value)}
                  placeholder="Min"
                  type="number"
                  value={minPrice}
                />
                <span className="text-slate-600">-</span>
                <input
                  className="w-full rounded border border-white/10 bg-surface-container-lowest p-2 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-tertiary focus:ring-0"
                  min="0"
                  onChange={(event) => setMaxPrice(event.target.value)}
                  placeholder="Max"
                  type="number"
                  value={maxPrice}
                />
              </div>
            </div>

            <div className="mb-8">
              <span className="mb-4 block font-label-bold text-xs uppercase tracking-widest text-slate-500">
                Current Rank
              </span>
              <div className="space-y-3">
                {ranks.map((rank) => (
                  <label
                    className="group flex cursor-pointer items-center gap-3"
                    key={rank}
                  >
                    <input
                      checked={selectedRanks.includes(rank)}
                      className="h-5 w-5 rounded border-white/10 bg-surface-container-lowest text-tertiary focus:ring-tertiary focus:ring-offset-surface"
                      onChange={() => toggleRank(rank)}
                      type="checkbox"
                    />
                    <span className="text-sm font-body-md text-slate-200 transition-colors group-hover:text-tertiary">
                      {rank}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <span className="mb-4 block font-label-bold text-xs uppercase tracking-widest text-slate-500">
                Hero Count
              </span>
              <div className="grid grid-cols-2 gap-2">
                {heroFilters.map((filter) => {
                  const isActive = selectedHeroCount === filter.value;

                  return (
                    <button
                      className={`rounded border py-2 text-xs transition-colors hover:border-tertiary ${
                        isActive
                          ? "border-tertiary bg-tertiary/20 text-tertiary"
                          : "border-white/10 bg-surface-container-lowest text-white"
                      }`}
                      key={filter.label}
                      onClick={() => setSelectedHeroCount(filter.value)}
                      type="button"
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              className="mt-8 w-full rounded bg-surface-container-highest py-3 text-sm font-label-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
              onClick={resetFilters}
              type="button"
            >
              Reset All Filters
            </button>
          </section>

          <section className="glass-card rounded-xl border-cyan-400/30 bg-gradient-to-br from-blue-600/20 to-cyan-400/20 p-6">
            <h2 className="mb-2 font-headline-md text-tertiary">
              Sell your ROV Account
            </h2>
            <p className="mb-4 text-xs text-slate-200">
              Get the best price for your hard-earned skins and rankings.
            </p>
            <Link
              className="block w-full rounded bg-white py-3 text-center text-sm font-label-bold text-slate-950 transition-colors hover:bg-cyan-50"
              href="#"
            >
              List Now
            </Link>
          </section>
        </aside>

        <section className="flex-grow">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body-md text-slate-100">
              <span className="font-bold text-tertiary">
                {filteredAccounts.length}
              </span>{" "}
              Accounts found
            </p>
            <label className="flex items-center gap-2">
              <span className="text-xs font-label-bold uppercase text-slate-500">
                Sort by:
              </span>
              <select
                className="cursor-pointer rounded border border-white/10 bg-surface-container-lowest px-3 py-2 text-sm font-label-bold text-white focus:border-tertiary focus:ring-0"
                onChange={(event) => setSortBy(event.target.value)}
                value={sortBy}
              >
                <option className="bg-surface-container-lowest text-white" value="latest">
                  Latest Listed
                </option>
                <option className="bg-surface-container-lowest text-white" value="price-asc">
                  Price: Low to High
                </option>
                <option className="bg-surface-container-lowest text-white" value="price-desc">
                  Price: High to Low
                </option>
                <option className="bg-surface-container-lowest text-white" value="heroes">
                  Hero Count
                </option>
              </select>
            </label>
          </div>

          {filteredAccounts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredAccounts.map((account) => (
                <AccountCard account={account} key={account.id} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-xl p-10 text-center text-slate-100">
              No accounts match these filters.
            </div>
          )}

          <nav
            aria-label="Pagination"
            className="mt-xl flex items-center justify-center gap-4"
          >
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition-all hover:border-tertiary hover:text-tertiary"
              type="button"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  className={`flex h-10 w-10 items-center justify-center rounded-lg font-label-bold transition-all ${
                    page === 1
                      ? "bg-tertiary text-on-tertiary"
                      : "border border-white/10 hover:border-tertiary hover:text-tertiary"
                  }`}
                  key={page}
                  type="button"
                >
                  {page}
                </button>
              ))}
              <span className="flex h-10 w-10 items-center justify-center text-slate-500">
                ...
              </span>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 font-label-bold transition-all hover:border-tertiary hover:text-tertiary"
                type="button"
              >
                12
              </button>
            </div>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition-all hover:border-tertiary hover:text-tertiary"
              type="button"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </nav>
        </section>
      </div>
    </main>
  );
}

function AccountCard({ account }: { account: Account }) {
  return (
    <article
      className={`glass-card glow-hover group overflow-hidden rounded-xl transition-all duration-500 ${
        account.featured ? "scan-line" : ""
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          alt={account.imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={account.image}
        />
        {account.badge ? (
          <div
            className={`absolute left-4 top-4 rounded px-2 py-1 font-label-bold text-[10px] uppercase tracking-widest ${account.badgeClass}`}
          >
            {account.badge}
          </div>
        ) : null}
        {account.metaText ? (
          // Status strip overlays the image, matching the original marketplace mockup.
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 to-transparent p-4">
            <span
              className={`flex items-center gap-1 ${
                account.metaIcon === "verified"
                  ? "text-tertiary"
                  : "text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {account.metaIcon}
              </span>
              <span className="text-[10px] font-label-bold uppercase tracking-widest">
                {account.metaText}
              </span>
            </span>
          </div>
        ) : null}
      </div>

      <div className="p-5">
        <h3 className="mb-4 min-h-14 font-headline-md text-lg text-white transition-colors group-hover:text-tertiary">
          {account.title}
        </h3>
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded bg-surface-container-low p-2">
            <span className="block font-label-bold text-[10px] uppercase text-slate-500">
              Rank
            </span>
            <span className="text-sm font-headline-md text-white">
              {account.rank}
            </span>
          </div>
          <div className="rounded bg-surface-container-low p-2">
            <span className="block font-label-bold text-[10px] uppercase text-slate-500">
              {account.statLabel}
            </span>
            <span className="text-sm font-headline-md text-white">
              {account.statValue}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="block font-label-bold text-[10px] uppercase text-slate-500">
              Start Price
            </span>
            <span className="text-glow font-headline-md text-xl text-tertiary">
              ฿{currency.format(account.price)}
            </span>
          </div>
          <Link
            // Cart action currently routes to the checkout page for the selected account.
            aria-label={`Checkout ${account.title}`}
            className="material-symbols-outlined rounded-lg bg-tertiary/10 p-2 text-tertiary transition-all hover:bg-tertiary hover:text-on-tertiary"
            href="/checkout"
          >
            shopping_cart
          </Link>
        </div>
      </div>
    </article>
  );
}
