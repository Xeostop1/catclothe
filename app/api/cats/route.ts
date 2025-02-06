//api/cats 의 엔드포인트가 자동생성됨
//get post 을 각각 함수로 만들 수 있음 
import { NextResponse } from "next/server";
import cats from '@/app/data/cats.json'
// Next.js 14에서 경로를 단축해서 사용하는 방식 ->루트 디렉토리(app/)를 기준으로 가져올 수 있음.


export async function GET(): Promise<NextResponse> {
    try {
      // 실제 DB 연동 시 여기서 데이터 조회 쿼리 실행
      return NextResponse.json(cats);
    } catch (error) {
      return NextResponse.json(
        { error: "고양이 데이터 조회 실패" },
        { status: 500 }
      );
    }
  }

  //파라미터가 있는 이유 폼에서 -> 데이터를 가지고 오니까 
  export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = await request.json();      // 클라이언트가 보낸 JSON 데이터 읽기
        return NextResponse.json({ message: "데이터 수신", received: body });
    } catch (error) {
        return NextResponse.json({ error: "요청 처리 실패" }, { status: 500 });
    }
}
