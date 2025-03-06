"use client";

import { useState } from "react";
import { Cat } from "@/app/types/Cat";

type CatListProps = {
  catListFromServer: Cat[];
};

export default function CatList({ catListFromServer }: CatListProps) {
  console.log("클라이언트에서 받은 catListFromServer:", catListFromServer);

  const [cats, setCats] = useState<Cat[]>(catListFromServer);

  return (
    <div>
      <h1>🐱 고양이 리스트</h1>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}
