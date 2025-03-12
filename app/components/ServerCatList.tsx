"use client";

import { Cat } from "@/app/types/Cat";

type ServerCatListProps = {
  cats: Cat[];
};

export default function ServerCatList({ cats }: ServerCatListProps) {
  return (
    <div>
      {cats.length === 0 ? (
        <p>저장된 고양이가 없습니다.</p>
      ) : (
        <ul>
          {cats.map((cat) => (
            <li key={cat.id}>
              <h3>{cat.name}</h3>
              <img src={`/images/cats/${cat.path}.png`} alt={cat.name} width={80} />
              <p>상의: {cat.clothes.top}</p>
              <p>하의: {cat.clothes.bottom}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
