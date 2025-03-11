"use client";

import { useState } from "react";
import { Clothes } from "@/app/types/Clothes";
import { Cat } from "@/app/types/Cat";
import { createRandomCat } from "@/app/utility/catUtils";
import SaveCat from "@/app/components/SaveCat";  // **** default import로 변경

export default function RandomCatGenerator({ clothes }: { clothes: Clothes[] }) {
  const [randomCat, setRandomCat] = useState<Cat | null>(null);

  const generateRandomCat = () => {
    setRandomCat(createRandomCat(clothes));
  };

  return (
    <div>
      <h2>랜덤 고양이 생성기</h2>
      <button onClick={generateRandomCat}>랜덤 고양이 생성</button>

      {/* **** randomCat이 존재할 때만 렌더링되도록 추가 */}
      {randomCat && (
        <div>
          <h3>🐱 {randomCat.name}</h3>
          <img 
            src={`/images/cats/${randomCat.path}.png`} 
            alt={randomCat.name} 
            width={100} 
          />
          <p>상의: {randomCat.clothes.top}</p>
          <p>하의: {randomCat.clothes.bottom}</p>

          {/* **** SaveCat 컴포넌트에 randomCat을 props로 전달 */}
          <SaveCat cat={randomCat} />  
        </div>
      )}
    </div>
  );
}
