"use client";

import { Cat } from "@/app/types/Cat";

type ServerCatListProps = {
  cats: Cat[];  // **** props로 고양이 리스트 받기
};

export default function ServerCatList({ cats }: ServerCatListProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold">🐱 저장된 고양이</h2>
      {cats.length === 0 ? (
        <p>저장된 고양이가 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {cats.map((cat) => (
            <li key={cat.id} className="border p-2 rounded">
              <p className="font-semibold">{cat.name}</p>
              <img src={`/images/cats/${cat.path}.png`} alt={cat.name} width={50} />
              <p>👕 상의: {cat.clothes.top}</p>
              <p>👖 하의: {cat.clothes.bottom}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
