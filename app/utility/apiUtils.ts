import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2025-02-06", // 최신 버전
  token: process.env.SANITY_API_TOKEN,
});

// 성공 응답을 반환하는 함수
export const successResponse = <T>(data: T, status: number) => 
  NextResponse.json(data, { status });

export const errorResponse = (message: string, status: number) => 
  NextResponse.json({ error: message }, { status });

// ==============================================

//  **** Sanity에서 고양이 데이터를 가져오는 함수 추가 ****
export const fetchCats = async () => {
  try {
    const cats = await client.fetch(`*[_type == "cat"]`); // Sanity에서 가져오기
    console.log("fetchCats********: ", cats);
    
    return cats; // 데이터 반환
  } catch (error) {
    console.error("고양이 목록 불러오기 실패:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

//  **** getData()에서 fetchCats()를 사용하도록 수정 ****
export const getData = async () => {
  try {
    const cats = await fetchCats(); // **** fetchCats() 호출 ****
    return successResponse(cats, 200);
  } catch (error) {
    return errorResponse("고양이 목록 불러오기 실패", 500);
  }
};

// POST: 새 고양이 저장 (Sanity에 추가)
export const postData = async (request: Request) => {
  try {
    const body = await request.json();

    const newCat = {
      _type: "cat",
      name: body.name,
      path: body.path,
      createdAt: new Date().toISOString(), // 생성 날짜 추가
      clothes: body.clothes,
    };

    const createdCat = await client.create(newCat); // Sanity에 저장
    return successResponse(createdCat, 201);
  } catch (error) {
    return errorResponse("고양이 저장 실패", 500);
  }
};

// PATCH: 기존 고양이 정보 수정 (Sanity에서 수정)
export const patchData = async (request: Request) => {
  try {
    const { id, ...updates } = await request.json();

    const updatedCat = await client.patch(id).set(updates).commit(); // Sanity에서 수정
    return successResponse(updatedCat, 200);
  } catch (error) {
    return errorResponse("고양이 수정 실패", 500);
  }
};

// DELETE: 고양이 삭제 (Sanity에서 삭제)
export const deleteData = async (request: Request) => {
  try {
    const { id } = await request.json();

    await client.delete(id); // Sanity에서 삭제
    return successResponse({ message: "삭제 완료" }, 200);
  } catch (error) {
    return errorResponse("고양이 삭제 실패", 500);
  }
};
