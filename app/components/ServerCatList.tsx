import { Cat } from "@/app/types/Cat";
import CatList from "@/app/components/CatList";

export default async function ServerCatList() {
  const res = await fetch("http://localhost:3000/api/cats", { cache: "no-store" });

  if (!res.ok) {
    console.error("서버 데이터 불러오기 실패!");
    throw new Error("고양이 데이터를 불러오는데 실패했습니다.");
  }

  const cats: Cat[] = await res.json();

  console.log("서버에서 받은 cats:", cats);

  return <CatList catListFromServer={cats} />;
}
