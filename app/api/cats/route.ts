//api/cats 의 엔드포인트가 자동생성됨
//get post 을 각각 함수로 만들 수 있음 
import * as apiUtils from '@/app/utility/apiUtils';
import cats from '@/app/data/cats.json'
// Next.js 14에서 경로를 단축해서 사용하는 방식 ->루트 디렉토리(app/)를 기준으로 가져올 수 있음.

export async function GET() {
  return apiUtils.getData(cats, 'No cats found');
}

export async function POST(request: Request) {
  return apiUtils.postData(request, cats, 'Invalid cat data');
}

export async function PATCH(request: Request) {
  return apiUtils.patchData(request, cats, 'Cat not found');
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  return apiUtils.deleteData(cats, id, 'Cat not found');
}