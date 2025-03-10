import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

// ✅ Sanity 클라이언트 설정
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2025-02-06",
  token: process.env.SANITY_API_TOKEN,
});

// ✅ GET: Sanity에서 데이터 가져오기
export const getData = async (errorMessage: string = "Not Found") => {
  try {
    const data = await client.fetch(`*[_type == "cat"]`); // 모든 고양이 데이터 가져오기
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

// ✅ POST: Sanity에 데이터 추가하기
export const postData = async (request: Request, errorMessage: string = "Invalid Data") => {
  try {
    const newData = await request.json();
    if (!newData || Object.keys(newData).length === 0) {
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const doc = {
      _type: "cat",
      name: newData.name,
      path: newData.path,
      createdAt: new Date().toISOString(),
      clothes: {
        top: newData.clothes.top,
        bottom: newData.clothes.bottom,
      },
    };

    const createdDoc = await client.create(doc); // Sanity에 데이터 저장
    return NextResponse.json(createdDoc, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
};

// ✅ PATCH: Sanity에서 데이터 수정하기
export const patchData = async (request: Request, errorMessage: string = "Not Found") => {
  try {
    const { id, ...updates } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updatedDoc = await client.patch(id).set(updates).commit(); // Sanity에서 데이터 수정
    return NextResponse.json(updatedDoc, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};

// ✅ DELETE: Sanity에서 데이터 삭제하기
export const deleteData = async (request: Request, errorMessage: string = "Not Found") => {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await client.delete(id); // Sanity에서 데이터 삭제
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
