import { Clothes } from "@/app/types/Clothes";
import ClothesList from "@/app/components/ClothesList";

export default async function ServerClothesList() {
  const res = await fetch(`http://localhost:3000/api/clothes`, { cache: "no-store" });
  const clothes : Clothes[] = await res.json();

  return <ClothesList clothesFromServer={clothes} />;
}
