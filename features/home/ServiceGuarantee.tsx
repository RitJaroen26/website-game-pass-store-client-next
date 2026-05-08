export default function ServiceGuarantee() {
    const guarantees = [
        { title: "ไอดีแท้ 100%", desc: "ตรวจสอบทุกไอดีอย่างละเอียด มั่นใจได้", icon: "verified_user", color: "bg-cyan-400/20 text-cyan-400" },
        { title: "ประกันหลังการขาย", desc: "คืนเงินทันทีหากพบปัญหาในการโอนย้าย", icon: "shield_with_heart", color: "bg-primary-container/20 text-primary-container" },
        { title: "โอนย้ายรวดเร็ว", desc: "ระบบอัตโนมัติช่วยให้รับไอดีทำได้รวดเร็ว", icon: "electric_bolt", color: "bg-tertiary-container/20 text-tertiary" },
    ];

    return (
        <section className="py-xl bg-surface-container-lowest">
            <div className="max-w-[1280px] mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                    {guarantees.map((item, idx) => (
                        <div key={idx} className="glass-card p-lg rounded-xl flex items-start gap-md glow-hover transition-all text-cyan-400">
                            <div className={`p-sm rounded-lg ${item.color}`}>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>{item.icon}</span>
                            </div>
                            <div>
                                <h3 className="text-[#dfdfdf] text-headline-md font-headline-md mb-xs">{item.title}</h3>
                                <p className="text-on-surface-variant text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}