"use client";

import { useState } from "react";
import { Cat } from "@/app/types/Cat";

type CatListProps = {
  catListFromServer: Cat[];
};

export default function CatList({ catListFromServer }: CatListProps) {
  const [catList, setCatList] = useState<Cat[]>(catListFromServer);

  console.log(catListFromServer,"****** 여기에서 안 넘어오는거 확인 ");
  
  //  빈 배열이면 "저장된 고양이가 없습니다." 표시
  if (!catListFromServer || catListFromServer.length === 0) {
    return <div className="text-gray-500">🐱 저장된 고양이가 없습니다.</div>;
  }

  //  고양이 삭제 기능
  const handleDelete = async (_id: string) => {
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
        setCatList(prevCats => prevCats.filter(cat => cat._id !== _id)); //  상태 업데이트
      } else {
        console.error("삭제 실패:", await res.json());
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div>
      <ul>
        {catList.map(cat =>
          cat._id ? ( 
            <li key={cat._id} className="flex justify-between items-center p-2 border-b">
              <span>{cat.name}</span>
              <button onClick={() => handleDelete(cat._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                삭제
              </button>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
