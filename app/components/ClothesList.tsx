"use client";

import { useState } from "react";
import { Clothes } from "@/app/types/Clothes";

export type ClothesListProps = {
  clothesFromServer: Clothes[];
};

export default function ClothesList({ clothesFromServer }: ClothesListProps) {
  const [clothes, setClothes] = useState<Clothes[]>(clothesFromServer); 

  const fetchNewClothes = async () => {
    const res = await fetch("/api/clothes");
    const newClothes = await res.json();
    setClothes(newClothes);  
  };

  return (
    <div>
      <h1>👕 Clothes List</h1>
      <button onClick={fetchNewClothes}>새로운 옷 가져오기</button>
      <ul>
        {clothes.map((item) => (
          <li key={item.id}>{item.type} - {item.color}</li>
        ))}
      </ul>
    </div>
  );
}
