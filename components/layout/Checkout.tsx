import Link from "next/link";

const accountDetails = [
  {
    icon: "military_tech",
    label: "Rank",
    value: "Supreme Conqueror",
  },
  {
    icon: "group",
    label: "Hero Count",
    value: "114 ฮีโร่",
  },
  {
    icon: "trending_up",
    label: "Win Rate",
    value: "68.5%",
  },
];

const summaryItems = [
  {
    label: "ราคาบัญชี",
    value: "฿8,500.00",
    valueClass: "text-slate-200",
  },
  {
    label: "ค่าธรรมเนียมการโอน",
    value: "฿150.00",
    valueClass: "text-slate-200",
  },
  {
    label: "ส่วนลด (Voucher)",
    value: "- ฿200.00",
    valueClass: "text-tertiary",
  },
];

export default function Checkout() {
  return (
    <main className="mx-auto max-w-[1280px] px-4 pb-20 pt-32 text-slate-200 md:px-8">
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="flex-1 space-y-12">
          <header>
            <h1 className="mb-2 font-headline-lg text-display text-slate-200">
              ตรวจสอบรายการสั่งซื้อ
            </h1>
            <p className="font-body-lg text-slate-400">
              กรุณาเลือกวิธีการชำระเงินและตรวจสอบข้อมูลบัญชีของคุณ
            </p>
          </header>

          <section className="glass-card scan-line space-y-8 rounded-xl border-primary/20 p-8">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg md:w-64">
                <img
                  alt="cinematic close-up of a heroic gaming character skin with glowing cyan armor and digital particle effects in a dark arena"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHWyTB5h9SJKa5UKzf9_-zdZ1fV33m2Jl_GN6Y3hqVpirWFwmFvL0UI5vntRYEplADF2EVQ-dJ8cgdaUw5DDyrF_w5oWOwCUQtwTUkc7CBf_SbEs3QTmWWXm8bDiOkVYZK5RUDmzepFXTJQEJFMtK7TqZ6jB-jH8bR8XIoI2kU7jA52dblV8IDE8vQt19mmwROgZUIoJJAnZxaCdiAxdHezasWLDbucZzM7GQYEZcFXIhmhe7cnMtaIxqAbtTtuHKB4b8zIwvpNX_c"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 rounded border border-cyan-400/40 bg-cyan-400/20 px-3 py-1 backdrop-blur-md">
                  <span className="text-xs font-label-bold uppercase tracking-widest text-cyan-400">
                    Featured
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <h2 className="font-headline-md text-slate-200">
                  ROV Account ID: #2948192
                </h2>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  {accountDetails.map((detail) => (
                    <div className="space-y-1" key={detail.label}>
                      <span className="text-xs uppercase text-slate-400 font-label-bold">
                        {detail.label}
                      </span>
                      <p className="flex items-center gap-2 font-body-lg text-slate-200">
                        <span className="material-symbols-outlined text-tertiary">
                          {detail.icon}
                        </span>
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="font-headline-md text-slate-200">
              เลือกช่องทางการชำระเงิน
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="glass-card group relative cursor-pointer rounded-xl border-2 border-cyan-400 p-6 transition-all">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10">
                      <span className="material-symbols-outlined text-3xl text-cyan-400">
                        account_balance_wallet
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-200 font-label-bold">
                        ยอดเงินคงเหลือในระบบ
                      </p>
                      <p className="text-xs text-slate-400">
                        ยอดเงินปัจจุบัน: ฿15,200.00
                      </p>
                    </div>
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-cyan-400">
                    <div className="h-3 w-3 rounded-full bg-cyan-400" />
                  </div>
                </div>
              </div>

              <div className="glass-card group cursor-pointer rounded-xl border border-white/10 p-6 transition-all hover:border-cyan-400/50">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5">
                      <span className="material-symbols-outlined text-3xl text-slate-400">
                        payments
                      </span>
                    </div>
                    <div>
                      <p className="text-slate-200 font-label-bold">
                        ชำระเงินโดยตรง
                      </p>
                      <p className="text-xs text-slate-400">
                        PromptPay, QR Code, บัตรเครดิต
                      </p>
                    </div>
                  </div>
                  <div className="h-6 w-6 rounded-full border-2 border-white/10" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="w-full lg:w-96">
          <div className="glass-card sticky top-32 space-y-8 rounded-xl border-white/10 p-8 shadow-xl">
            <h3 className="border-b border-white/5 pb-4 font-headline-md text-slate-200">
              สรุปการสั่งซื้อ
            </h3>

            <div className="space-y-4">
              {summaryItems.map((item) => (
                <div className="flex justify-between font-body-md" key={item.label}>
                  <span className="text-slate-400">{item.label}</span>
                  <span className={item.valueClass}>{item.value}</span>
                </div>
              ))}

              <div className="flex items-end justify-between border-t border-white/5 pt-4">
                <span className="text-slate-200 font-label-bold">ราคาสุทธิ</span>
                <div className="text-right">
                  <span className="mb-1 block text-xs font-label-bold uppercase text-cyan-400">
                    Total Amount
                  </span>
                  <span className="font-display text-3xl font-black text-slate-200">
                    ฿8,450.00
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button className="neon-glow flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 py-4 font-headline-md text-white transition-all active:scale-95">
                ยืนยันการสั่งซื้อ
                <span className="material-symbols-outlined">rocket_launch</span>
              </button>
              <p className="px-4 text-center text-[10px] leading-relaxed text-slate-400">
                การกด &quot;ยืนยันการสั่งซื้อ&quot; แสดงว่าคุณยอมรับ{" "}
                <Link className="text-cyan-400 underline" href="#">
                  เงื่อนไขและข้อตกลง
                </Link>{" "}
                ของทางแพลตฟอร์ม LootLevel
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-surface-container p-4">
              <span className="material-symbols-outlined text-xl text-tertiary">
                verified_user
              </span>
              <div>
                <p className="text-xs text-slate-200 font-label-bold">
                  Buyer Protection
                </p>
                <p className="text-[10px] text-slate-400">
                  รับประกันความปลอดภัย คืนเงินเต็มจำนวนหากข้อมูลไม่ถูกต้อง
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
