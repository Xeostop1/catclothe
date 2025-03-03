import * as apiHandler from '@/app/utility/apiUtils'; 
import cats from '@/data/cats.json';

export async function GET() {
  return apiHandler.getData(cats, 'No cats found'); //  공통 함수 사용
}

export async function POST(request: Request) {
  return apiHandler.postData(request, cats, 'Invalid cat data'); //  공통 함수 사용
}

export async function PATCH(request: Request) {
  return apiHandler.patchData(request, cats, 'Cat not found'); //  공통 함수 사용
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  return apiHandler.deleteData(cats, id, 'Cat not found'); //  공통 함수 사용
}
