// ✅ "use client" 제거! (서버 컴포넌트)
import { fetchCats } from "@/app/utility/apiUtils";
import CatList from "@/app/components/CatList";

export default async function ServerCatList() {
  // ✅ Sanity에서 고양이 리스트 불러오기
  const cats = await fetchCats();
  console.log("서버로그 확인 cats*******: ",cats);
  
  return (
    <div>
      <CatList catListFromServer={cats} /> {/* ✅ 클라이언트에서 상태 관리 */}
    </div>
  );
}
