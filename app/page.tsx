import Image from "next/image";
import CatList from "@/app/components/CatList";
import ServerClothesList from "@/app/components/ServerClothesList";
import ServerCatList from "@/app/components/ServerCatList";

export default function Home() {
  return (
    <div>
      <h1>🐾 Welcome to the Cat Dressing App! 🎩</h1>
      <ServerCatList/>
      <ServerClothesList />
    </div>
  )
}

//"return <태그> 이런거 있으면 무조건 .tsx"