// app/utility/apiService.ts (클라이언트 호출용)
import { useEffect, useState } from 'react';

// 공통 요청 함수
// RequestInit = {}=> 이렇게 한 이유는 js에서 옵션을 생략하거나, 빈객체로 전달하면 알아서 get으로 처리함!
//패치 기본 구조 fetch(url, options);

const request = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  return response.json();
};

// useEffect로 데이터 조회하는 Hook
export const useFetchData = (endpoint: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await request(`/api/${endpoint}`);
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]); // endpoint가 변경될 때마다 데이터 새로고침

  return { data, loading, error };
};

// 데이터 생성 (POST 요청)
export const createData = async <T>(endpoint: string, data: T) => {
  return request(`/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

// 데이터 수정 (PATCH 요청)
export const updateData = async <T>(endpoint: string, id: number, updates: Partial<T>) => {
  return request(`/api/${endpoint}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updates }),
  });
};

// 데이터 삭제 (DELETE 요청)
export const deleteData = async (endpoint: string, id: number) => {
  return request(`/api/${endpoint}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
};
