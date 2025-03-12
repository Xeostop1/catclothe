"use client";

import { useState } from "react";
import { Cat } from "@/app/types/Cat";

type SaveCatProps = {
  cat: Cat;
  onSave: (newCat: Cat) => Promise<void>; // ✅ onSave prop 추가
};

export default function SaveCat({ cat, onSave }: SaveCatProps) { // ✅ onSave 추가
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const saveCat = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/cats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cat),
      });

      if (res.ok) {
        const savedCat = await res.json(); // ✅ 저장된 데이터 받아오기
        await onSave(savedCat); // ✅ 부모(Home)에서 상태 업데이트

        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        console.error("저장 실패:", await res.json());
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
    setIsSaving(false);
  };

  return (
    <div>
      <button onClick={saveCat} disabled={isSaving}>
        {isSaving ? "저장 중..." : "저장"}
      </button>

      {isSaved && <div className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded">저장 완료!</div>}
    </div>
  );
}
