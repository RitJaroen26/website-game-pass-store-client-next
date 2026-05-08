export default function Stats() {
    const stats = [
        { value: "50K+", label: "ไอดีที่ขายแล้ว" }, { value: "120K", label: "ผู้ใช้งานทั้งหมด" },
        { value: "24/7", label: "ซัพพอร์ตดูแล" }, { value: "99.9%", label: "ความพึงพอใจ" },
    ];
    return (
        <section className="py-xl bg-slate-950">
            <div className="max-w-[1280px] mx-auto px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-lg text-center">
                    {stats.map((s, i) => (
                        <div key={i}>
                            <p className="text-display font-display text-cyan-400">{s.value}</p>
                            <p className="text-slate-400 font-label-bold">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}