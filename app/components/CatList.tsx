'use client'

import { useEffect, useState } from "react";
import { Cat } from "@/app/types/Cat";

export default function CatList() {
  const [cats, setCats] = useState<Cat[]>([]); // Cat 배열 타입 지정

  useEffect(() => {
    fetch("/api/cats") 
      .then((res) => res.json())
      .then((data) => setCats(data)) // 받아온 데이터 전체를 저장
      .catch((error) => console.error("Error fetching cats:", error)); //  오류 출력 수정
  }, []);

  return (
    <div>
      <h1>🐱 Cat List</h1>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}
