import { Clothes } from "@/app/types/Clothes";
import ClothesCarousel from "@/app/components/ClothesCarousel";
import ServerCatList from "@/app/components/ServerCatList";
import RandomCatGenerator from "@/app/components/RandomCatGenerator";

export default async function Home() {
  // ✅ 한 번만 fetch하여 여러 컴포넌트에서 사용
  const res = await fetch("http://localhost:3000/api/clothes", { cache: "no-store" });
  const clothes: Clothes[] = await res.json();

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">🐾 Welcome to Cat Dress-Up🐾</h1>

      {/* ✅ 고양이 리스트 */}
      <section>
        <h2 className="text-xl font-semibold">🐱 고양이 리스트</h2>
        <ServerCatList />
      </section>

      {/* ✅ 랜덤 고양이 생성 버튼 (옷 리스트 위로 이동) */}
      <section>
        <h2 className="text-xl font-semibold">🎲 랜덤 고양이 생성</h2>
        <RandomCatGenerator clothes={clothes} /> {/* ✅ clothes를 props로 전달 */}
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
