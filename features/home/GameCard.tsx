interface Stat { label: string; value: string; }
export interface GameCardProps {
    image: string; game: string; badge?: string; level: string; price: string; title: string;
    gameColor: string; stats: Stat[];
}

export default function GameCard({ image, game, badge, level, price, title, gameColor, stats }: GameCardProps) {
    return (
        <div className="glass-card rounded-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 relative">
            <div className="relative h-48 overflow-hidden">
                <img alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={image} />
                {badge && <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-cyan-400 border border-cyan-400/30 uppercase">{badge}</div>}
                <div className="absolute bottom-0 left-0 w-full p-sm bg-gradient-to-t from-slate-950 to-transparent">
                    <span className={`text-xs font-bold text-white px-2 py-1 rounded ${gameColor}`}>{game}</span>
                </div>
            </div>
            <div className="p-md scanning-animation overflow-hidden">
                <div className="flex justify-between items-center mb-sm">
                    <span className="text-sm font-label-bold text-on-surface-variant">{level}</span>
                    <span className="text-tertiary text-lg font-black tracking-tighter">{price}</span>
                </div>
                <h4 className="text-white text-body-md font-bold mb-md truncate">{title}</h4>
                <div className="grid grid-cols-2 gap-xs mb-md">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white/5 p-2 rounded flex flex-col items-center">
                            <span className="text-[10px] text-[#dfdfdf] uppercase tracking-tighter">{stat.label}</span>
                            <span className="text-[#dfdfdf] text-sm font-bold">{stat.value}</span>
                        </div>
                    ))}
                </div>
                <button className="text-white cursor-pointer w-full py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-bold hover:bg-cyan-400 hover:text-slate-950 transition-colors">ดูรายละเอียด</button>
            </div>
        </div>
    );
}