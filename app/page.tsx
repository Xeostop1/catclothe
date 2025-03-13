"use client";

import { useState, useEffect } from "react";
import { Clothes } from "@/app/types/Clothes";
import { Cat } from "@/app/types/Cat";
import { fetchCats } from "@/app/utility/apiUtils"; //  서버에서 고양이 데이터 불러오기 함수 사용
import ClothesCarousel from "@/app/components/ClothesCarousel"; //컴퍼넌트
import CatList from "@/app/components/CatList"; 
import RandomCatGenerator from "@/app/components/RandomCatGenerator";

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([]);  //고영희랑 옷 상태 감지 
  const [clothes, setClothes] = useState<Clothes[]>([]);

  //  고양이와 옷 데이터 가져오기
  //useEffect 하는일 : 데이터를 불러오거나, 이벤트 설정, 상태 동기화에 사용
  // 기본 사용 코드=========== 
  // useEffect(() => {
  //   console.log("컴포넌트가 렌더링되었어요!");
  // }, []); 
// ============특정상태가 변경될때마다 실행하기 위한 것 
// function Counter() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log(`🧮 count가 변경되었습니다: ${count}`);
//   }, [count]); // ✅ count가 변경될 때마다 실행됨

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버에서 고양이 호출 
        const fetchedCats = await fetchCats();
        console.log("🐱 가져온 고양이 데이터:", fetchedCats); 
        setCats(fetchedCats); //  상태 업데이트

        //서버에서 옷 가져오기 
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

  //  고양이 저장 후 최신데이터 반영 함수 
  const handleCatSaved = async (newCat: Cat) => {
    console.log("🐱 새로 저장된 고양이:", newCat);
    setCats((prevCats) => [...prevCats, newCat]);     //  상태 먼저 업데이트
    const updatedCats = await fetchCats();          //  서버에서 최신 데이터 가져오기
    console.log("🔄 최신 고양이 리스트:", updatedCats);
    setCats(updatedCats);             //  최신 데이터로 다시 업데이트
  };

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">🐾 Welcome to Cat Dress-Up🐾</h1>

      {/*  저장된 고양이 리스트 표시 */}
      <section>
        <h2 className="text-xl font-semibold">🐱 저장된 고양이 리스트</h2>
        <CatList catListFromServer={cats} onCatDeleted={async () => setCats(await fetchCats())} /> {/*  데이터 정상 전달 */}
      </section>

      {/*  랜덤 고양이 생성 */}
      <section>
        <h2 className="text-xl font-semibold">🎲 랜덤 고양이 생성</h2>
        <RandomCatGenerator clothes={clothes} onSave={handleCatSaved} /> {/*  저장 후 UI 자동 업데이트 */}
      </section>

      {/*  옷 캐러셀 */}
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
