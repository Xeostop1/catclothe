"use client";

import { useState } from "react";
import { Clothes } from "@/app/types/Clothes";

type ClothesType = 'top' | 'bottom' | 'accessory' | 'hat' | 'shoes';    //확장성을 위해 타입을 여기서 추가 

type ClothesProps = {       //자식에게 줄 옷 프롭스 타입정의 
    clothes: Clothes[];     //배열
    type: ClothesType;     
};


// findNextClothes      이 함수가 하는 일은 무엇인가? 현재옷에서 next로 넘어갈때 그옷이 몇번째 인덱스인지 찾는 함수 
// 파라미터는 현재 인덱스, 옷 리스트, 현재 보는 타입 전체 타입은 숫자 *** 왜 전체 타입이 숫자인가? -> 전체타입이 숫자가 아니라 파라미터 다음에 쓴거는 리턴타입을 정의해 준것 
function findNextClothes(curIndex: number, clothes: Clothes[], type: ClothesType): number {
    const filtered = clothes.filter(item => item.type === type);    // 타입이 같은 아이템만 필터 
    const curFilteredIndex = filtered.findIndex(item => item.id === clothes[curIndex].id);      //필터된 아이템의 인덱스 -> 그 인덱스를 가진 옷들의 id만 추출 *** 여기 모르겠음

    if (curFilteredIndex === -1 || curFilteredIndex === filtered.length - 1) {  //현재의 인덱스가 -1과 같거나  또는 현재 인덱스가 렝스의ㅣ -1과(마지막)이라면 
        // 마지막이면 첫 번째로 순환 -> 0으로 돌아오기 
        return clothes.findIndex(item => item.id === filtered[0].id);
    } else {
        // 아니라면 현재 필터된 인덱스의 + id 
        return clothes.findIndex(item => item.id === filtered[curFilteredIndex + 1].id);
    }
}

//findPrevClothes
function findPrevClothes(curIndex: number, clothes: Clothes[], type: ClothesType): number {
    const filtered = clothes.filter(item => item.type === type);
    const curFilteredIndex = filtered.findIndex(item => item.id === clothes[curIndex].id);

    if (curFilteredIndex === -1 || curFilteredIndex === 0) {
        // 첫 번째면 마지막으로 순환
        return clothes.findIndex(item => item.id === filtered[filtered.length - 1].id);
    } else {
        return clothes.findIndex(item => item.id === filtered[curFilteredIndex - 1].id);
    }
}





//리액트 컴퍼넌트는 파스칼 / 함수명은 카멜로 쓰는게 좋다!
export default function ClothesCarousel({ clothes, type }: ClothesProps) {
    const [curIndex, setcurIndex] = useState(0);

    const nextClothes = () => {
        const nextIndex = findNextClothes(curIndex, clothes, type);
        setcurIndex(nextIndex);
    };

    const prevClothes = () => {
        const prevIndex = findPrevClothes(curIndex, clothes, type);
        setcurIndex(prevIndex);
    };
    const typeLabel = {
        top: "👕 상의",
        bottom: "👖 하의",
        accessory: "🎀 악세사리",
        hat: "🧢 모자",
        shoes: "👟 신발"
    }[type] || "❓ 알 수 없는 타입";

    return (
        <div>
        <h2>{typeLabel} - {clothes[curIndex].path}</h2>

            <div>
                <button className="carousel-btn" onClick={prevClothes}>⬅️</button>
                <img src={`/images/clothes/${clothes[curIndex].path}`} alt={`${clothes[curIndex].path}`} width={100} />
                <button className="carousel-btn" onClick={nextClothes}>➡️</button>
            </div>
        </div>
    );
}
