// utils/catUtils.ts
import { Clothes } from "@/app/types/Clothes";
import { Cat } from "@/app/types/Cat";
import { getRandomCatName, getRandomClothes } from "./randomUtils";  // ✅ 랜덤 유틸 가져오기

export function createRandomCat(clothes: Clothes[]): Cat {
  return {
    id: Date.now(), 
    name: getRandomCatName(),
    path: `cat${Math.floor(Math.random() * 5) + 1}`,  // ✅ 1~5 범위 랜덤 이미지 선택
    createdAt: new Date().toISOString(),
    clothes: getRandomClothes(clothes)  // ✅ 랜덤 옷 선택
  };
}
