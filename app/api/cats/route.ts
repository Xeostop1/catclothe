import * as apiUtils from '@/app/utility/apiUtils'; // 기존 공통 API 파일 사용

export async function GET() {
  console.log("라우터에서 실행 되는지 확인필요");
  
  return apiUtils.getData(); // Sanity에서 데이터 가져오기
}

export async function POST(request: Request) {
  return apiUtils.postData(request); // Sanity에 데이터 저장
}

export async function PATCH(request: Request) {
  return apiUtils.patchData(request); // Sanity 데이터 수정
}

export async function DELETE(request: Request) {
  return apiUtils.deleteData(request); // Sanity 데이터 삭제
}
