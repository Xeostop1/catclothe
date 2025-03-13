"use client";

import { useEffect, useState } from "react";
import { Cat } from "@/app/types/Cat";

type CatListProps = {
  catListFromServer: Cat[];
  onCatDeleted: () => Promise<void>; // ✅ 삭제 후 최신 데이터 반영
};

export default function CatList({ catListFromServer, onCatDeleted }: CatListProps) {
  const [catList, setCatList] = useState<Cat[]>(catListFromServer);

  // ✅ catListFromServer가 변경될 때 상태 업데이트
  useEffect(() => {
    console.log("🐱 catListFromServer 변경됨:", catListFromServer);
    setCatList(catListFromServer);
  }, [catListFromServer]); // ✅ catListFromServer가 변경될 때 실행

  // ✅ 빈 배열이면 "저장된 고양이가 없습니다." 표시
  if (!catList || catList.length === 0) {
    console.log("🚨 저장된 고양이가 없습니다.");
    return <div className="text-gray-500">🐱 저장된 고양이가 없습니다.</div>;
  }

  // ✅ 고양이 삭제 기능
  const handleDelete = async (_id: string | undefined) => {
    if (!_id) {
      console.error("삭제할 수 없는 데이터: _id가 없음");
      return;
    }

    try {
      const res = await fetch("/api/cats", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      });

      if (res.ok) {
        console.log("🗑️ 삭제 성공:", _id);
        await onCatDeleted(); // ✅ 삭제 후 최신 데이터 가져오기
      } else {
        console.error("삭제 실패:", await res.json());
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">🐱 저장된 고양이 리스트</h2>
      <ul>
        {catList.map(cat =>
          cat._id ? (
            <li key={cat._id} className="flex justify-between items-center p-2 border-b">
              <span>{cat.name}</span>
              <button
                onClick={() => handleDelete(cat._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                삭제
              </button>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
