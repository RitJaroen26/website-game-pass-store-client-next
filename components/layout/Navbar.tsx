"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/libs/api";

export default function Navbar() {
    const [isClient, setIsClient] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("Player");
    const [balance, setBalance] = useState("0.00");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [avatar, setAvatar] = useState("https://s.isanook.com/mv/0/ud/29/148323/sanook_6bb414e5ly1h8m9unjhvsj.jpg?ip/resize/w728/q80/jpg");

    useEffect(() => {
        const checkAuthStatus = async () => {
            if (typeof window === "undefined") return;
            setIsClient(true);

            const token = localStorage.getItem("token");
            const userStr = localStorage.getItem("user");

            if (token) {
                setIsLoggedIn(true);

                if (userStr && userStr !== "undefined" && userStr !== "null") {
                    try {
                        const user = JSON.parse(userStr);
                        if (user?.username) {
                            setUsername(user.username);
                        } else if (user?.email) {
                            setUsername(user.email.split("@")[0]);
                        }
                    } catch {
                        console.warn("ไม่สามารถแปลงข้อมูลผู้ใช้จาก localStorage ได้");
                    }
                }

                try {
                    const response = await api.get("/wallet");

                    if (response?.data?.balance !== undefined) {
                        setBalance(
                            parseFloat(response.data.balance).toLocaleString("th-TH", {
                                minimumFractionDigits: 2,
                            })
                        );
                    }
                } catch (error) {
                    console.error("ไม่สามารถดึงข้อมูลยอดเงินได้:", error);
                }
            } else {
                setIsLoggedIn(false);
                setUsername("Player");
                setBalance("0.00");
            }
        };

        checkAuthStatus();

        window.addEventListener("auth-change", checkAuthStatus);

        return () => {
            window.removeEventListener("auth-change", checkAuthStatus);
        };
    }, []); 

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUsername("Player");
        setBalance("0.00");
        window.dispatchEvent(new Event("auth-change"));
        window.location.href = "/";
    };


    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-[0_0_20px_rgba(0,242,255,0.1)]">
            <div className="flex justify-between items-center h-20 px-4 md:px-8 max-w-[1280px] mx-auto w-full">
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 font-headline-lg cursor-pointer"
                    >
                        GAMELORD
                    </Link>
                </div>

                <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-['Space_Grotesk'] text-sm font-bold tracking-tight">
                    <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                        Promotion
                    </Link>
                    <Link href="/RovAc" className="text-slate-400 hover:text-white transition-colors">
                        Marketplace
                    </Link>
                    <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                        Boosting
                    </Link>
                    <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                        Review
                    </Link>
                    <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                        Support
                    </Link>
                </nav>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="text-slate-400 hover:text-cyan-400 transition-colors p-1 md:p-0">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>

                    {isLoggedIn && (
                        <Link
                            href="/TopUp"
                            className="flex items-center gap-1 sm:gap-2 bg-slate-900 border border-cyan-400/30 px-2 sm:px-3 py-1.5 rounded-full cursor-pointer hover:bg-slate-800 hover:shadow-[0_0_10px_rgba(0,242,255,0.2)] transition-all"
                        >
                            <span className="material-symbols-outlined text-cyan-400 text-xs sm:text-sm">
                                account_balance_wallet
                            </span>
                            <span className="text-white text-xs sm:text-sm font-bold tracking-wider">
                                ฿{balance}
                            </span>
                        </Link>
                    )}

                    <div className="relative z-50">
                        {!isLoggedIn ? (
                            <Link
                                href="/Login"
                                className="bg-gradient-to-r from-blue-600 to-cyan-400 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-bold text-white hover:opacity-90 active:scale-95 transition-all inline-block"
                            >
                                เข้าสู่ระบบ
                            </Link>
                        ) : (
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-white text-sm font-bold">{username}</p>
                                        <p className="text-tertiary text-xs">Member</p>
                                    </div>
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0a0f1c] border-2 border-tertiary flex items-center justify-center overflow-hidden hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all">
                                        {/* <span className="material-symbols-outlined text-tertiary text-[18px] sm:text-[24px]">
                                            sports_esports
                                        </span> */}
                                        <img src={avatar} alt="" />
                                    </div>
                                </div>

                                <div className="absolute right-0 top-full mt-2 w-56 bg-[#0a0f1c]/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                                    <div className="p-4 border-b border-slate-700/50 sm:hidden block">
                                        <p className="text-white text-sm font-bold">{username}</p>
                                        <p className="text-tertiary text-xs">Member</p>
                                    </div>

                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">account_circle</span>
                                        โปรไฟล์ของฉัน
                                    </Link>

                                    <Link
                                        href="/TopUp"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                                        เติมเงิน
                                    </Link>

                                    <div className="border-t border-slate-700/50"></div>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-slate-800/50 hover:text-red-300 transition-colors text-left"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">logout</span>
                                        ออกจากระบบ
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors ml-1"
                    >
                        <span className="material-symbols-outlined text-3xl">
                            {isMobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#0a0f1c]/95 backdrop-blur-xl border-t border-white/10 overflow-hidden transition-all">
                    <nav className="flex flex-col font-['Space_Grotesk'] text-sm font-bold tracking-tight px-4 py-2">
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-slate-300 hover:text-cyan-400 hover:bg-white/5 py-4 border-b border-white/5 px-2 transition-colors"
                        >
                            Marketplace
                        </Link>
                        <Link
                            href="/RovAc"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-slate-300 hover:text-cyan-400 hover:bg-white/5 py-4 border-b border-white/5 px-2 transition-colors"
                        >
                            Sell Account
                        </Link>
                        <Link
                            href="#"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-slate-300 hover:text-cyan-400 hover:bg-white/5 py-4 border-b border-white/5 px-2 transition-colors"
                        >
                            Boosting
                        </Link>
                        <Link
                            href="#"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-slate-300 hover:text-cyan-400 hover:bg-white/5 py-4 px-2 transition-colors"
                        >
                            Support
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}