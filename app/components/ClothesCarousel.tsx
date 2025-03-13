"use client";

import { useState, useEffect } from "react";
import { Clothes } from "@/app/types/Clothes";

type ClothesType = 'top' | 'bottom' | 'accessory' | 'hat' | 'shoes';

type ClothesCarouselProps = {
  clothes: Clothes[];
  type: ClothesType;
};

export default function ClothesCarousel({ clothes, type }: ClothesCarouselProps) {
  const [filteredClothes, setFilteredClothes] = useState<Clothes[]>([]);
  const [curIndex, setCurIndex] = useState(0);

  useEffect(() => {
    const filtered = clothes.filter(item => item.type === type);
    setFilteredClothes(filtered);
    setCurIndex(0);
  }, [clothes, type]);

  const nextClothes = () => {
    setCurIndex((prevIndex) => (prevIndex + 1) % filteredClothes.length);
  };

  const prevClothes = () => {
    setCurIndex((prevIndex) => (prevIndex - 1 + filteredClothes.length) % filteredClothes.length);
  };

  if (filteredClothes.length === 0) {
    return <div className="text-red-500">No clothes available for {type}</div>;
  }

  return (
    <div className="space-y-2">
      <h2 className="font-bold">{type} Clothes</h2>
      <div className="flex items-center gap-4">
        <button className="carousel-button" onClick={prevClothes}>⬅️</button>
        <img
          src={`/images/clothes/${filteredClothes[curIndex].path}`}
          alt={`${filteredClothes[curIndex].path}`}
          width={100}
          className="rounded"
        />
        <button className="carousel-button" onClick={nextClothes}>➡️</button>
      </div>
    </div>
  );
}
