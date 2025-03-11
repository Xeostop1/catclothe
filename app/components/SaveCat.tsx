"use client";

import { useState } from "react";
import { Cat } from "@/app/types/Cat";
import MessagePopup from "./MessagePopup";


export default function SaveCat({ cat }: { cat: Cat }) {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const saveCat = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/cats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cat),
      });

      if (res.ok) {
        setMessage("🐱 저장 완료!"); // 저장 완료 메시지 표시
      } else {
        setMessage("⚠️ 저장 실패!");
      }
    } catch (error) {
      setMessage("❌ 에러 발생!");
    }
    setIsSaving(false);
  };

  return (
    <div>
      <button onClick={saveCat} disabled={isSaving}>
        {isSaving ? "저장 중..." : "저장"}
      </button>

      {message && <MessagePopup message={message} />} {/* 메시지 팝업 표시 */}
    </div>
  );
}

