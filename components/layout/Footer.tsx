import Link from "next/link";

export default function Footer() {
    return (
        // ✅ เอา mt-10 ออกแล้วครับ เพื่อให้มันเลื่อนขึ้นไปติดกับส่วน Stats ด้านบน
        <footer className="w-full border-t border-white/5 pt-16 pb-8 bg-slate-950">
            <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* คอลัมน์ซ้าย: โลโก้ และ รายละเอียด */}
                <div className="flex flex-col gap-4">
                    <span className="text-xl font-black text-slate-200 font-headline-lg uppercase">
                        LOOTLEVEL MARKETPLACE
                    </span>
                    <p className="text-slate-500 font-body-md max-w-[400px] leading-relaxed">
                        จุดเริ่มต้นของการเป็นผู้เล่นระดับตำนาน ค้นหาไอดีคุณภาพเยี่ยมในราคามิตรภาพ ปลอดภัย รวดเร็ว เชื่อใจได้
                    </p>
                    <div className="flex gap-4 mt-2">
                        <span className="material-symbols-outlined text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors">
                            social_leaderboard
                        </span>
                        <span className="material-symbols-outlined text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors">
                            chat
                        </span>
                        <span className="material-symbols-outlined text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors">
                            alternate_email
                        </span>
                    </div>
                </div>

                {/* คอลัมน์ขวา: เมนูลัด */}
                <div className="grid grid-cols-2 gap-8 mt-8 md:mt-0">
                    <div className="flex flex-col gap-3">
                        <h5 className="text-cyan-400 font-label-bold mb-2">ศูนย์ช่วยเหลือ</h5>
                        <Link href="#" className="text-slate-500 hover:text-cyan-400 transition-colors uppercase text-[10px] tracking-widest font-medium">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-slate-500 hover:text-cyan-400 transition-colors uppercase text-[10px] tracking-widest font-medium">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-slate-500 hover:text-cyan-400 transition-colors uppercase text-[10px] tracking-widest font-medium">
                            Refund Policy
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h5 className="text-cyan-400 font-label-bold mb-2">ลิงก์อื่นๆ</h5>
                        <Link href="#" className="text-slate-500 hover:text-cyan-400 transition-colors uppercase text-[10px] tracking-widest font-medium">
                            Trust Center
                        </Link>
                        <Link href="#" className="text-slate-500 hover:text-cyan-400 transition-colors uppercase text-[10px] tracking-widest font-medium">
                            FAQ
                        </Link>
                    </div>
                </div>

            </div>

            {/* แถบลิขสิทธิ์ด้านล่างสุด */}
            <div className="max-w-[1280px] mx-auto px-8 mt-12 pt-8 border-t border-white/5">
                <p className="text-slate-500 font-['Space_Grotesk'] text-[10px] font-medium uppercase tracking-widest text-center md:text-left">
                    © 2024 LOOTLEVEL MARKETPLACE. ALL RIGHTS RESERVED.
                </p>
            </div>
        </footer>
    );
}