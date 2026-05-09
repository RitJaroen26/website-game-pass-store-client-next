import { useState, useEffect } from "react";
import api from "@/libs/api";

// ⭐ ระบุ Interface ให้ชัดเจน (ก๊อปมาจากหน้า Profile ได้เลย)
export interface Transaction {
  id: string;
  orderNumber: string;
  item: { name: string };
  createdAt: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  amount: string | number;
}

interface Stats {
  totalOrders: number;
  totalTopUps: number;
  rewardPoints: number;
}

export function useProfileData() {
  const [balance, setBalance] = useState<string>("0.00");
  const [transactions, setTransactions] = useState<Transaction[]>([]); // ⭐ เปลี่ยนจาก any[]
  const [stats, setStats] = useState<Stats>({ totalOrders: 0, totalTopUps: 0, rewardPoints: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const [walletRes, ordersRes, statsRes] = await Promise.allSettled([
          api.get("/wallet"),
          api.get("/orders/my-orders"),
          api.get("/orders/stats")
        ]);

        if (!isActive) return;

        if (walletRes.status === "fulfilled" && walletRes.value.data?.balance !== undefined) {
          setBalance(Number(walletRes.value.data.balance).toLocaleString("th-TH", { minimumFractionDigits: 2 }));
        }
        
        if (ordersRes.status === "fulfilled") {
          setTransactions(ordersRes.value.data);
        }

        if (statsRes.status === "fulfilled") {
          setStats(statsRes.value.data);
        }
      } catch (err) {
        console.error("Fetch profile data error:", err);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchData();
    return () => { isActive = false; };
  }, []);

  return { balance, transactions, stats, isLoading };
}