import { Clothes } from "@/app/types/Clothes";
import ClothesList from "@/app/components/ClothesList"; 
import ClothesCarousel from "@/app/components/ClothesCarousel"; 

export default async function ServerClothesList() {
  const res = await fetch("http://localhost:3000/api/clothes", { cache: "no-store" });
  const clothes: Clothes[] = await res.json(); // **서버에서 데이터 가져오기**

  return (
    <section>
      {/* **** ClothesList와 ClothesCarousel 둘 다 props 전달 */}
      <ClothesList clothesFromServer={clothes} />
      
      <h2 className="font-semibold">👕 Top Clothes</h2>
      <ClothesCarousel clothes={clothes} type="top" />

      <h2 className="font-semibold">👖 Bottom Clothes</h2>
      <ClothesCarousel clothes={clothes} type="bottom" />
    </section>
  );
}
