"use client";

import { useState, useEffect } from "react";
import { Clothes } from "@/app/types/Clothes";
import { Cat } from "@/app/types/Cat";
import { fetchCats } from "@/app/utility/apiUtils"; // ✅ 서버에서 고양이 데이터 불러오기
import ClothesCarousel from "@/app/components/ClothesCarousel";
import ServerCatList from "@/app/components/ServerCatList";
import RandomCatGenerator from "@/app/components/RandomCatGenerator";

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [clothes, setClothes] = useState<Clothes[]>([]);

  // ✅ 고양이와 옷 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCats = await fetchCats();
      setCats(fetchedCats);

      try {
        const res = await fetch("/api/clothes");
        if (!res.ok) throw new Error("옷 데이터를 불러오는데 실패했습니다.");
        const data: Clothes[] = await res.json();
        setClothes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // ✅ 저장된 고양이를 즉시 반영하는 함수
  const handleCatSaved = async (newCat: Cat) => {
    setCats((prevCats) => [...prevCats, newCat]); // **** 먼저 상태 업데이트
    const updatedCats = await fetchCats(); // **** 서버에서 최신 데이터 가져오기
    setCats(updatedCats); // **** 최신 데이터로 다시 업데이트
  };

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">🐾 Welcome to Cat Dress-Up🐾</h1>

      {/* ✅ 저장된 고양이 리스트 표시 */}
      <section>
        <h2 className="text-xl font-semibold">🐱 저장된 고양이 리스트</h2>
        <ServerCatList cats={cats} /> {/* ✅ 상태 업데이트로 자동 반영 */}
      </section>

      {/* ✅ 랜덤 고양이 생성 */}
      <section>
        <h2 className="text-xl font-semibold">🎲 랜덤 고양이 생성</h2>
        <RandomCatGenerator clothes={clothes} onSave={handleCatSaved} /> {/* ✅ 저장 후 UI 자동 업데이트 */}
      </section>

      {/* ✅ 옷 캐러셀 */}
      <section>
        <h2 className="text-xl font-semibold">👗 옷 선택</h2>
        <h3 className="font-semibold">👕 윗도리</h3>
        <ClothesCarousel clothes={clothes} type="top" />
        <h3 className="font-semibold">👖 하의</h3>
        <ClothesCarousel clothes={clothes} type="bottom" />
      </section>
    </main>
  );
}
