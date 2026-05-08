"use client";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative w-full h-[600px] overflow-hidden flex items-center">
            <div className="absolute inset-0 z-0">
                <img alt="Gaming Hero" className="w-full h-full object-cover opacity-40" src="https://img.4gamers.com.tw/ckfinder-th/image2/auto/2023-08/ROV_NEWSKIN_VALHEIN-230820-143148.jpeg?versionId=K1HsqvALnpreYLFB4aeLVCAfsOnW6pvI" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full">
                <div className="max-w-2xl">
                    <span className="inline-block py-1 px-3 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold rounded mb-sm tracking-widest uppercase">
                        Special Deals / โปรโมชั่นสุดพิเศษ
                    </span>
                    <h1 className="text-white text-display font-display mb-sm leading-tight">
                        LEVEL UP YOUR <br /><span className="gradient-text">GAMING LEGACY</span>
                    </h1>
                    <p className="text-body-lg text-on-surface-variant mb-lg font-body-lg">
                        ตลาดกลางซื้อขายไอดีเกมที่ปลอดภัยที่สุด ROV, Free Fire และอีกมากมาย พร้อมการรับประกันไอดีแท้ 100%
                    </p>
                    <div className="flex gap-md">
                        <Link href="/RovAc" className="h-20 md:h-full bg-gradient-to-r from-blue-600 to-cyan-400 px-lg py-md rounded-lg text-white font-label-bold hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all flex items-center gap-xs">
                            สำรวจตลาด <span className="material-symbols-outlined text-sm md:text-md">arrow_forward</span>
                        </Link>
                        <button className="h-20 md:h-full text-[12px] md:text-[16px] text-center overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md px-3 py-2 md:py-md rounded-lg text-white font-label-bold hover:bg-white/10 transition-all">
                            กฏกติกาการซื้อและเงื่อนไขเข้าประกันหลังการขาย!
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}