"use client";

import { useState } from "react";
import { Clothes } from "@/app/types/Clothes";
import { Cat } from "@/app/types/Cat";
import { createRandomCat } from "@/app/utility/catUtils";
import SaveCat from "@/app/components/SaveCat"; //  저장 버튼 컴포넌트 추가

//  Props 타입 정의에 `onSave` 추가
type RandomCatGeneratorProps = {
  clothes: Clothes[];
  onSave: (newCat: Cat) => Promise<void>;
};

export default function RandomCatGenerator({ clothes, onSave }: RandomCatGeneratorProps) {
  const [randomCat, setRandomCat] = useState<Cat | null>(null);

  // 랜덤 고양이 생성
  const generateRandomCat = () => {
    const newCat = createRandomCat(clothes);
    setRandomCat(newCat);
  };

  return (
    <div>
      <h2>랜덤 고양이 생성기</h2>
      <button onClick={generateRandomCat}>랜덤 고양이 생성</button>

      {randomCat && (
        <div>
          <h3>🐱 {randomCat.name}</h3>
          <img src={`/images/cats/${randomCat.path}.png`} alt={randomCat.name} width={100} />
          <p>상의: {randomCat.clothes.top}</p>
          <p>하의: {randomCat.clothes.bottom}</p>

          {/*  저장 버튼 추가 */}
          <SaveCat cat={randomCat} onSave={onSave} />
        </div>
      )}
    </div>
  );
}
