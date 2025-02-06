// src/utils/apiHandler.ts
import { NextResponse } from 'next/server';

//공통 에러함수
export const errorResponse = (message: string, status: number) => 
  NextResponse.json({ error: message }, { status });

// 공통 성공함수
export const successResponse = <T>(data: T, status: number) => 
  NextResponse.json(data, { status });

// GET
export const getData = <T>(data: T[] | null, errorMessage: string = 'Not Found') => {
  return data ? successResponse(data, 200) : errorResponse(errorMessage, 404);
};

// POST
export const postData = async <T>(request: Request, existingData: T[], errorMessage: string = 'Invalid Data') => {
  try {
    
    const newData = await request.json();               // 요청 데이터를 json으로 변환
    if (!newData || !Object.keys(newData).length) {             // 데이터가 없거나, 객체안에 랭스가 0일때       
      return errorResponse(errorMessage, 400);
    }
    //데이터 주소 새로 생성 -> 상태변경 인식 가능 
    return successResponse([...existingData, newData], 201);
  } catch (err) {
    return errorResponse('Server Error', 500);
  }
};

// 패치 함수
export const patchData = async <T extends { id: number }>(
  request: Request,
  existingData: T[],
  errorMessage: string = 'Not Found'
) => {
  try {
    //json에서 가져오는 데이터들을 id와 나머지 데이터를 구조분해 할당해서 각자 변수로 저장 (id, 업데이트 부분 따로 값을 가지고 옴)
    const { id, ...updates } = await request.json();
    //id가 있는 배열을 인덱스를 반환 
    const index = existingData.findIndex(item => item.id === id);
    //findIndex는 값이 없으면 -1 반환 
    if (index === -1) {
      return errorResponse(errorMessage, 404);
    }

    const updatedData = { ...existingData[index], ...updates };
    //이것도 직접 수정하지 않고 새로운 배열 데이터를 생성해 준것 
    const newData = [...existingData];
    newData[index] = updatedData;

    return successResponse(updatedData, 200);
  } catch (err) {
    return errorResponse('Server Error', 500);
  }
};

// 데이터 삭제 함수 (DELETE)
export const deleteData = <T extends { id: number }>(
  existingData: T[],
  id: number,
  errorMessage: string = 'Not Found'
) => {
  const index = existingData.findIndex(item => item.id === id);
  if (index === -1) {
    return errorResponse(errorMessage, 404);
  }

  return successResponse({ message: 'Deleted successfully', data: existingData.filter(item => item.id !== id) }, 200);
};
