// components/RandomCatGenerator.tsx
"use client";

import { useState } from "react";
import { Clothes } from "@/app/types/Clothes";
import { Cat } from "@/app/types/Cat";
import { createRandomCat } from "@/app/utility/catUtils";

export default function RandomCatGenerator({ clothes }: { clothes: Clothes[] }) {
  const [randomCat, setRandomCat] = useState<Cat | null>(null);

  const generateRandomCat = () => {
    setRandomCat(createRandomCat(clothes));
  };

  return (
    <div>
      <button onClick={generateRandomCat}>랜덤 고양이 생성</button>

      {randomCat && (
        <div>
          <h3>🐱 {randomCat.name}</h3>
          <img src={`/images/cats/${randomCat.path}.png`} alt={randomCat.name} width={100} />
          <p>상의: {randomCat.clothes.top}</p>
          <p>하의: {randomCat.clothes.bottom}</p>
        </div>
      )}
    </div>
  );
}
