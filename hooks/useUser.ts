import { useState, useEffect, useSyncExternalStore } from "react";

export type StoredUser = {
    username?: string;
    email?: string;
    displayId?: string;
    tier?: string;
    avatarUrl?: string;
};

// ส่วนการจัดการ Cache ภายนอก Hook (เพื่อความเสถียรของค่า)
let lastSerializedUser: string | null = null;
let cachedUser: StoredUser | null = null;

function subscribe(callback: () => void) {
    window.addEventListener("auth-change", callback);
    window.addEventListener("storage", callback);
    return () => {
        window.removeEventListener("auth-change", callback);
        window.removeEventListener("storage", callback);
    };
}

function getSnapshot() {
    if (typeof window === "undefined") return null;

    const currentUserStr = localStorage.getItem("user");

    // หัวใจสำคัญ: ถ้า String ใน localStorage เหมือนเดิม ให้คืนค่า Object ตัวเดิม (Cache)
    if (currentUserStr === lastSerializedUser) {
        return cachedUser;
    }

    lastSerializedUser = currentUserStr;
    try {
        cachedUser = currentUserStr ? JSON.parse(currentUserStr) : null;
    } catch {
        cachedUser = null;
    }

    return cachedUser;
}

function getServerSnapshot() {
    return null;
}

export function useUser() {
    const userData = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // ป้องกัน Cascading Renders ด้วยการขยับไปทำในจังหวะถัดไป
        const tid = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(tid);
    }, []);

    const safeUser = mounted ? userData : null;

    return {
        isMounted: mounted,
        profileName: safeUser?.username || safeUser?.email?.split("@")[0] || "Player",
        profileEmail: safeUser?.email || "ไม่พบอีเมล",
        displayId: safeUser?.displayId || "GL-XXXXXX",
        tier: safeUser?.tier || "MEMBER",
        avatar: safeUser?.avatarUrl || "https://s.isanook.com/mv/0/ud/29/148323/sanook_6bb414e5ly1h8m9unjhvsj.jpg?ip/resize/w728/q80/jpg"
    };
}