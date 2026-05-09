"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/libs/api";

type AuthResponse = {
  data?: {
    token?: string;
    user?: unknown;
  };
  message?: string;
};

export default function Login() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const toggleMode = () => {
    setIsLoginMode((currentMode) => !currentMode);
    resetForm();
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedUsername = username.trim();

    if (isLoginMode) {
      if (!trimmedEmail || !trimmedPassword) {
        alert("กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน");
        return;
      }
    } else if (!trimmedEmail || !trimmedUsername || !trimmedPassword) {
      alert("กรุณากรอกข้อมูลและชื่อผู้ใช้งานให้ครบถ้วน");
      return;
    }

    setIsLoading(true);

    const apiUrl = isLoginMode ? "/auth/login" : "/auth/register";

    const payload = isLoginMode
      ? { email: trimmedEmail, password: trimmedPassword }
      : {
        email: trimmedEmail,
        username: trimmedUsername,
        password: trimmedPassword,
      };

    try {
      const response = (await api.post(apiUrl, payload)) as AuthResponse;

      if (isLoginMode) {
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
        }

        if (response.data?.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        router.push("/");
        router.refresh();
      } else {
        alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบด้วยบัญชีที่คุณเพิ่งสร้าง");
        setIsLoginMode(true);
        resetForm();
      }
    } catch (error: unknown) {
      console.error("API Error:", error);
      
      let errorMessage = "ไม่สามารถติดต่อเซิร์ฟเวอร์ได้";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null && "message" in error) {
        errorMessage = String((error as Record<string, unknown>).message);
      }

      alert(`ข้อผิดพลาด: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#020412] px-4 py-28 text-[#e0e3e5]">
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-blue-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-cyan-400/10 blur-[100px]" />

      <div className="z-10 mb-8 text-center">
        <div className="cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text font-['Space_Grotesk'] text-4xl font-black tracking-widest text-transparent">
          GAMELORD
        </div>
        <p className="mt-2 text-sm text-slate-400">
          ศูนย์รวมไอดีและเครดิตเกมอันดับ 1
        </p>
      </div>

      <section className="glass-panel z-10 w-full max-w-[28rem] rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-white">
            {isLoginMode ? "เข้าสู่ระบบ" : "สร้างบัญชีใหม่"}
          </h1>
          <p className="text-sm text-slate-400">
            {isLoginMode
              ? "ยินดีต้อนรับกลับมา! กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ"
              : "สมัครสมาชิกเพื่อรับกระเป๋าเงิน 0 บาทอัตโนมัติ"}
          </p>
        </div>

        <form
          className="fade-in space-y-5"
          key={isLoginMode ? "login" : "register"}
          onSubmit={handleSubmit}
        >
          {!isLoginMode && (
            <div className="space-y-1">
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                ชื่อผู้ใช้
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 text-xl text-slate-500 -translate-y-1/2">
                  person
                </span>
                <input
                  type="text"
                  required={!isLoginMode}
                  className="w-full rounded-lg border border-slate-700 bg-[#0a0f1c] py-3 pl-11 pr-4 text-sm text-white outline-none transition-all focus:border-tertiary focus:ring-1 focus:ring-tertiary"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-400">
              อีเมล
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 text-xl text-slate-500 -translate-y-1/2">
                mail
              </span>
              <input
                type="email"
                required
                className="w-full rounded-lg border border-slate-700 bg-[#0a0f1c] py-3 pl-11 pr-4 text-sm text-white outline-none transition-all focus:border-tertiary focus:ring-1 focus:ring-tertiary"
                placeholder="Email"
                value={email}
                onBlur={() => setEmail((currentEmail) => currentEmail.trim())}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-400">
              รหัสผ่าน
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 text-xl text-slate-500 -translate-y-1/2">
                lock
              </span>
              <input
                type="password"
                required
                className="w-full rounded-lg border border-slate-700 bg-[#0a0f1c] py-3 pl-11 pr-4 text-sm text-white outline-none transition-all focus:border-tertiary focus:ring-1 focus:ring-tertiary"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`glow-button mt-6 ${isLoading ? "is-loading" : ""}`}
            disabled={isLoading}
          >
            <div className="loading-glow" />
            <span className="flex items-center gap-2">
              {isLoading
                ? "กำลังดำเนินการ..."
                : isLoginMode
                  ? "เข้าสู่ระบบ"
                  : "สมัครสมาชิก"}
              {!isLoading && (
                <span className="material-symbols-outlined text-sm">
                  {isLoginMode ? "login" : "person_add"}
                </span>
              )}
            </span>
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          <span>{isLoginMode ? "ยังไม่มีบัญชีใช่ไหม?" : "มีบัญชีอยู่แล้ว?"}</span>
          <button
            type="button"
            className="ml-1 border-b border-transparent font-bold text-tertiary transition-colors hover:border-tertiary hover:text-white"
            onClick={toggleMode}
          >
            {isLoginMode ? "สมัครสมาชิกที่นี่" : "เข้าสู่ระบบ"}
          </button>
        </div>
      </section>
    </main>
  );
}
