"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type TopUpPackage = {
  label: string;
  amount: number;
  display: string;
  featured?: boolean;
};

const promptPayId = "0812345678";

const topUpPackages: TopUpPackage[] = [
  { label: "BASIC", amount: 100, display: "100" },
  { label: "POPULAR", amount: 300, display: "300" },
  { label: "STANDARD", amount: 500, display: "500" },
  { label: "ELITE", amount: 1000, display: "1,000" },
  { label: "SULTAN", amount: 5000, display: "5,000" },
  { label: "GOD PACK", amount: 50000, display: "50K", featured: true },
];

const moneyFormatter = new Intl.NumberFormat("th-TH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function WalletTopUpPage() {
  const router = useRouter();
  const [walletBalance, setWalletBalance] = useState("0.00");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [isQrVisible, setIsQrVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmittingSlip, setIsSubmittingSlip] = useState(false);

  useEffect(() => {
    let isActive = true;

    const fetchWalletBalance = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:4000/api/wallet", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const result = await response.json();
        if (isActive && result?.data?.balance !== undefined) {
          setWalletBalance(moneyFormatter.format(Number(result.data.balance)));
        }
      } catch (error) {
        console.error("Cannot fetch wallet balance:", error);
      }
    };

    fetchWalletBalance();

    return () => {
      isActive = false;
    };
  }, []);

  const formattedAmount = useMemo(
    () => `฿${moneyFormatter.format(selectedAmount)}`,
    [selectedAmount],
  );

  const promptPayQrUrl = useMemo(() => {
    if (selectedAmount < 20) return "";
    return `https://promptpay.io/${promptPayId}/${selectedAmount}.png`;
  }, [selectedAmount]);

  const resetPaymentView = () => {
    setIsQrVisible(false);
  };

  const selectPackage = (amount: number) => {
    setCustomAmount("");
    setSelectedAmount(amount);
    resetPaymentView();
  };

  const updateCustomAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCustomAmount(value);
    setSelectedAmount(Number(value) || 0);
    resetPaymentView();
  };

  const showQrCode = () => {
    if (selectedAmount < 20) {
      alert("กรุณาระบุจำนวนเงินขั้นต่ำ 20 บาท");
      return;
    }

    setIsQrVisible(true);
  };

  const handleSlipChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const resetSlip = () => {
    setSelectedFile(null);
    setIsSubmittingSlip(false);
  };

  const cancelQrPayment = () => {
    setIsQrVisible(false);
    resetSlip();
  };

  const confirmSlip = async () => {
    if (!selectedFile) {
      alert("กรุณาอัปโหลดสลิปโอนเงินก่อนครับ");
      return;
    }

    if (selectedAmount <= 0) {
      alert("กรุณาเลือกจำนวนเงินก่อนครับ");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนทำรายการ");
      router.push("/Login");
      return;
    }

    setIsSubmittingSlip(true);

    const formData = new FormData();
    formData.append("slipImage", selectedFile);
    formData.append("amount", String(selectedAmount));

    try {
      const response = await fetch("http://localhost:4000/api/wallet/deposit-slip", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          `เติมเงินสำเร็จ! ยอดเงินใหม่ของคุณคือ: ฿${moneyFormatter.format(
            Number(result.data.newBalance),
          )}`,
        );
        window.location.reload();
        return;
      }

      alert(`ข้อผิดพลาด: ${result.message}`);
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSubmittingSlip(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[1280px] flex-grow px-4 pb-16 pt-32 font-['Inter'] text-[#e0e3e5] md:px-8">
      <header className="mb-10 text-center md:text-left">
        <h1 className="mb-3 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
          เติมเงิน <span className="gradient-text">GAMELORD</span>
        </h1>
        <p className="text-base text-slate-400 md:text-lg">
          ยกระดับบัญชีของคุณด้วยเครดิตพรีเมียม รวดเร็ว ปลอดภัย ตลอด 24 ชั่วโมง
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <section className="glass-panel relative flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="rounded-xl border border-white/10 bg-slate-800/80 p-4 text-tertiary">
                <span className="material-symbols-outlined text-3xl">
                  account_balance_wallet
                </span>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                  ยอดคงเหลือปัจจุบัน
                </p>
                <p className="text-3xl font-black text-white">
                  {walletBalance} <span className="text-sm font-bold text-tertiary">THB</span>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
              <span className="material-symbols-outlined text-tertiary">payments</span>
              เลือกจำนวนเงิน
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {topUpPackages.map((item) => {
                const isActive = selectedAmount === item.amount && customAmount === "";

                return (
                  <button
                    className={`glass-panel relative overflow-hidden rounded-xl border-2 p-6 text-center transition-all hover:border-tertiary/50 active:scale-95 ${
                      isActive ? "border-tertiary bg-tertiary/10" : "border-transparent"
                    }`}
                    key={item.amount}
                    onClick={() => selectPackage(item.amount)}
                    type="button"
                  >
                    {item.featured ? (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-400/10" />
                    ) : null}
                    <p
                      className={`relative z-10 mb-1 text-xs font-bold tracking-wider ${
                        item.featured ? "text-cyan-400" : "text-slate-400"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="relative z-10 mb-1 text-3xl font-black text-white">
                      {item.display}
                    </p>
                    <p className="relative z-10 text-xs font-bold text-tertiary">
                      ฿{moneyFormatter.format(item.amount)}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="glass-panel rounded-xl border border-dashed border-slate-600 p-6 transition-colors hover:border-slate-500">
            <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-slate-400">
              หรือระบุจำนวนเงินเอง
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">
                ฿
              </span>
              <input
                className="w-full rounded-lg border border-slate-700 bg-[#0a0f1c] py-4 pl-10 pr-4 text-lg text-white outline-none transition-all placeholder:text-slate-500 focus:border-tertiary focus:ring-1 focus:ring-tertiary"
                min="20"
                onChange={updateCustomAmount}
                placeholder="กรอกจำนวนเงิน (ขั้นต่ำ 20 บาท)"
                type="number"
                value={customAmount}
              />
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <section className="glass-panel overflow-hidden rounded-xl">
            <div className="border-b border-white/5 bg-white/5 p-4">
              <h2 className="flex items-center gap-2 font-bold text-white">
                <span className="material-symbols-outlined text-tertiary">
                  qr_code_scanner
                </span>
                ช่องทางชำระเงิน
              </h2>
            </div>
            <div className="space-y-3 p-4">
              <label className="flex cursor-pointer items-center rounded-lg border border-tertiary bg-tertiary/10 p-4 transition-all">
                <input checked className="hidden" name="payment" readOnly type="radio" />
                <div className="flex w-full items-center justify-between">
                  <span className="font-bold text-white">PromptPay QR</span>
                  <img
                    alt="PromptPay"
                    className="h-5 object-contain opacity-90"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/PromptPay_logo.png/600px-PromptPay_logo.png"
                  />
                </div>
              </label>
            </div>
          </section>

          <section className="glass-panel space-y-4 rounded-xl p-6">
            <h3 className="border-b border-white/5 pb-3 text-xs font-bold uppercase text-slate-400">
              สรุปรายการเติมเงิน
            </h3>

            {!isQrVisible ? (
              <div className="block space-y-4">
                <div className="space-y-3 text-sm">
                  <SummaryRow label="ยอดเติม" value={formattedAmount} valueClass="text-white text-lg" />
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">ค่าธรรมเนียม</span>
                    <span className="rounded bg-tertiary/10 px-2 py-0.5 text-xs font-bold text-tertiary">
                      ฟรี
                    </span>
                  </div>
                  <SummaryRow
                    label="เครดิตที่จะได้รับ"
                    value={`${Math.floor(selectedAmount).toLocaleString("th-TH")} CP`}
                    valueClass="text-blue-400 text-lg"
                  />
                </div>

                <div className="border-t border-white/5 pt-4">
                  <div className="mb-6 flex items-end justify-between">
                    <span className="mb-1 font-bold text-slate-400">
                      ยอดสุทธิที่ต้องชำระ
                    </span>
                    <span className="gradient-text text-4xl font-black">
                      {formattedAmount}
                    </span>
                  </div>
                  <button className="glow-button h-14" onClick={showQrCode} type="button">
                    <div className="loading-glow" />
                    <span className="flex items-center gap-2">
                      ชำระเงินทันที
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="fade-in flex flex-col items-center justify-center space-y-4 py-2">
                <div className="w-full text-center">
                  <p className="mb-1 text-sm text-slate-400">สแกน QR Code เพื่อชำระเงิน</p>
                  <p className="mb-4 text-2xl font-black text-white">{formattedAmount}</p>
                  <div className="inline-block rounded-xl bg-white p-3 shadow-[0_0_20px_rgba(0,242,255,0.2)]">
                    {promptPayQrUrl ? (
                      <img
                        alt="PromptPay QR"
                        className="h-48 w-48 object-contain"
                        src={promptPayQrUrl}
                      />
                    ) : null}
                  </div>
                </div>
                <div className="w-full space-y-2 pt-2">
                  <button
                    className="w-full rounded-lg border border-slate-700 py-3 text-sm font-bold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                    onClick={cancelQrPayment}
                    type="button"
                  >
                    ยกเลิก / เปลี่ยนจำนวนเงิน
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 w-full space-y-3">
              <label className="block w-full cursor-pointer rounded-lg border border-dashed border-tertiary py-3 text-center text-sm font-bold text-tertiary transition-colors hover:bg-tertiary/10">
                <span className="material-symbols-outlined mr-1 align-middle">
                  upload_file
                </span>
                อัปโหลดรูปสลิปโอนเงิน
                <input
                  accept="image/jpeg, image/png"
                  className="hidden"
                  onChange={handleSlipChange}
                  type="file"
                />
              </label>

              {selectedFile ? (
                <p className="text-center text-xs text-slate-400">
                  เลือกไฟล์: <span className="text-white">{selectedFile.name}</span>
                </p>
              ) : null}

              {selectedFile ? (
                <button
                  className="glow-button"
                  disabled={isSubmittingSlip}
                  onClick={confirmSlip}
                  type="button"
                >
                  <span className="flex items-center gap-2">
                    {isSubmittingSlip ? "กำลังตรวจสอบสลิป..." : "ยืนยันการโอนเงิน"}
                    {!isSubmittingSlip ? (
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                    ) : null}
                  </span>
                </button>
              ) : null}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

function SummaryRow({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-300">{label}</span>
      <span className={`${valueClass} font-bold`}>{value}</span>
    </div>
  );
}
