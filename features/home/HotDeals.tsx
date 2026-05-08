import Link from "next/link";
import GameCard, { GameCardProps } from "./GameCard";

const dealsData: GameCardProps[] = [
    { image: "https://rechargeland.com/article/wp-content/uploads/2025/07/rov-skin-2025-tier.jpg", game: "ROV", badge: "FEATURED", gameColor: "bg-blue-600", level: "Lv. 30 | Conqueror", price: "฿ 4,500", title: "Full Skin Legend Collection", stats: [{ label: "Heroes", value: "102" }, { label: "Skins", value: "245" }] },
    { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoNz4uMxamSAcjzSTJ0ANS1gT_WgIoJ64euw&s", game: "Free Fire", gameColor: "bg-orange-600", level: "Lv. 30 | Conqueror", price: "฿ 12,900", title: "Dimentions Event Bundle + EVO Guns", stats: [{ label: "HEROES", value: "MAX" }, { label: "SKIN", value: "343" }] },
    { image: "https://www.techoffside.com/wp-content/uploads/2022/05/RoV-X-Demon-Slayer_-Kimetsu-no-Yaiba.jpg", game: "Valorant", gameColor: "bg-red-600", level: "Rank: Radiant", price: "฿ 7,200", title: "Kuronami & VCT Collection", stats: [{ label: "Skins", value: "32 Premium" }, { label: "Knives", value: "5 Rare" }] },
    { image: "https://thisisgamethailand.com/wp-content/uploads/2025/11/RoV_main.jpg", game: "PUBG Mobile", gameColor: "bg-yellow-600", level: "Lv. 80 | Conqueror", price: "฿ 25,000", title: "Pharaoh X-Suit Max Level", stats: [{ label: "X-Suits", value: "2 Max" }, { label: "Vehicles", value: "Lamborghini" }] },
];

export default function HotDeals() {
    return (
        <section className="py-xl">
            <div className="max-w-[1280px] mx-auto px-8">
                <div className="flex justify-between items-end mb-lg">
                    <div>
                        <h2 className="text-[#dfdfdf] text-headline-lg font-headline-lg mb-xs">HOT DEALS / ไอดีแนะนำ</h2>
                        <div className="h-1 w-24 bg-cyan-400 rounded-full"></div>
                    </div>
                    <Link href="#" className="text-cyan-400 font-label-bold flex items-center gap-xs hover:underline">
                        ดูทั้งหมด <span className="material-symbols-outlined">chevron_right</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                    {dealsData.map((deal, idx) => <GameCard key={idx} {...deal} />)}
                </div>
            </div>
        </section>
    );
}