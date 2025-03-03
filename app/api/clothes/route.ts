import * as apiHandler from '@/app/utility/apiUtils'; 
import clothes from '@/data/clothes.json';

export async function GET() {
  return apiHandler.getData(clothes, 'No cats found'); //   공통 함수 사용
}

// export async function POST(request: Request) {
//   return apiHandler.postData(request, clothes, 'Invalid cat data'); //   공통 함수 사용
// }

export async function PATCH(request: Request) {
  return apiHandler.patchData(request, clothes, 'Cat not found'); //   공통 함수 사용
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  return apiHandler.deleteData(clothes, id, 'Cat not found'); //   공통 함수 사용
}
