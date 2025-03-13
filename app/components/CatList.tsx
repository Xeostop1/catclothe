"use client";

import { useState, useEffect } from "react";
import { Cat } from "@/app/types/Cat";

type CatListProps = {
  catListFromServer: Cat[];
  onCatSaved: (newCat: Cat) => void; // 🆕 Home에서 추가된 고양이를 반영하는 함수
};

export default function CatList({ onCatSaved }: CatListProps) {
  const [cats, setCats] = useState<Cat[]>([]);

  // ✅ 서버에서 처음 고양이 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/cats");
        if (!res.ok) throw new Error("고양이 데이터를 불러올 수 없습니다.");
        const data: Cat[] = await res.json();
        setCats(data); // ✅ 상태 업데이트
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // ✅ 고양이 저장 기능 (Home에서 새로운 고양이 추가 시 반영)
  const handleCatSaved = (newCat: Cat) => {
    setCats((prevCats) => [...prevCats, newCat]); // ✅ 새 고양이를 추가
    onCatSaved(newCat); // ✅ Home에서도 업데이트
  };

  // ✅ 고양이 삭제 기능
  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      console.error("삭제할 수 없는 데이터: _id가 없음");
      return;
    }

    try {
      const res = await fetch("/api/cats", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setCats((prevCats) => prevCats.filter((cat) => cat._id !== id)); // ✅ 상태 업데이트
      } else {
        console.error("삭제 실패:", await res.json());
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  // ✅ UI 렌더링
  return (
    <div>
      <h2 className="text-xl font-semibold">🐱 저장된 고양이 리스트</h2>
      <ul>
        {cats.length > 0 ? (
          cats.map((cat) => (
            <li key={cat._id} className="flex justify-between items-center p-2 border-b">
              <span>{cat.name}</span>
              <button onClick={() => handleDelete(cat._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                삭제
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">🐱 저장된 고양이가 없습니다.</p>
        )}
      </ul>
    </div>
  );
}
