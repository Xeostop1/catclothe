// utils/randomUtils.ts
import { Clothes } from "../types/Clothes";


const randomNames = [
    "Milo", "Luna", "Oliver", "Bella", "Charlie",
    "Simba", "Leo", "Coco", "Max", "Nala"
  ];
  
  export function getRandomCatName(): string {
    return randomNames[Math.floor(Math.random() * randomNames.length)];
  }
  
  export function getRandomClothes(clothes: Clothes[]): { top: number; bottom: number } {
    const tops = clothes.filter(item => item.type === "top");
    const bottoms = clothes.filter(item => item.type === "bottom");

    return {
      top: tops.length ? tops[Math.floor(Math.random() * tops.length)].id : 0,
      bottom: bottoms.length ? bottoms[Math.floor(Math.random() * bottoms.length)].id : 0
    };
  }
  