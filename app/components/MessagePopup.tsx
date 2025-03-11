"use client";

import { useEffect, useState } from "react";

type MessagePopupProps = {
  message: string; // 표시할 메시지
  duration?: number; // 메시지가 유지되는 시간 (기본값 3초)
};

export default function MessagePopup({ message, duration = 3000 }: MessagePopupProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 제거
  }, [duration]);

  if (!visible) return null; // 메시지가 사라졌다면 렌더링하지 않음

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded shadow-lg animate-fade-out">
      {message}
    </div>
  );
}
