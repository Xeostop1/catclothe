// src/utils/apiHandler.ts
import { NextResponse } from 'next/server';

// ========== 공통 응답 함수 ==========
// ✅ 성공 응답을 반환하는 함수
export const successResponse = <T>(data: T, status: number) => 
  NextResponse.json(data, { status });

// ✅ 에러 응답을 반환하는 함수
export const errorResponse = (message: string, status: number) => 
  NextResponse.json({ error: message }, { status });

// ========== CRUD 함수 ==========
// ✅ GET: 데이터를 가져오는 함수
export const getData = <T>(data: T[] | null, errorMessage: string = 'Not Found') => {
  return data ? successResponse(data, 200) : errorResponse(errorMessage, 404);
};

// ✅ POST: 데이터를 추가하는 함수
export const postData = async <T extends { id: number; createdAt: string }>(
  request: Request,
  existingData: T[],
  errorMessage: string = 'Invalid Data'
) => {
  try {
    const newData = await request.json(); //   클라이언트에서 보낸 JSON 데이터

    if (!newData || Object.keys(newData).length === 0) {     
      return errorResponse(errorMessage, 400); //   데이터가 비어 있으면 에러 반환
    }

    const newItem: T = {
      ...newData,
      id: Date.now(), //   고유 ID 생성
      createdAt: new Date().toISOString(), //   생성 날짜 추가
    };

    const updatedData = [...existingData, newItem]; //   기존 데이터에 추가

    return successResponse(updatedData, 201);
  } catch (err) {
    return errorResponse('Server Error', 500);
  }
};

// ✅ PATCH: 기존 데이터를 수정하는 함수
export const patchData = async <T extends { id: number }>(
  request: Request,
  existingData: T[],
  errorMessage: string = 'Not Found'
) => {
  try {
    const { id, ...updates } = await request.json(); //   요청 데이터에서 id와 수정할 데이터 분리

    const index = existingData.findIndex(item => item.id === id); //   수정할 항목 찾기

    if (index === -1) {
      return errorResponse(errorMessage, 404); //   데이터가 없으면 에러 반환
    }

    const updatedItem = { ...existingData[index], ...updates }; //   기존 데이터에 업데이트 적용

    const newData = [...existingData];
    newData[index] = updatedItem;

    return successResponse(updatedItem, 200);
  } catch (err) {
    return errorResponse('Server Error', 500);
  }
};

// ✅ DELETE: 데이터를 삭제하는 함수
export const deleteData = <T extends { id: number }>(
  existingData: T[],
  id: number,
  errorMessage: string = 'Not Found'
) => {
  const index = existingData.findIndex(item => item.id === id);
  
  if (index === -1) {
    return errorResponse(errorMessage, 404);
  }

  const deletedItem = existingData[index];

  const newData = existingData.filter(item => item.id !== id);

  return successResponse({ message: 'Deleted successfully', deletedItem, data: newData }, 200);
};
