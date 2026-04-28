import { useState, useEffect } from "react";
import type { Club } from "../types";

interface ClubModalProps {
  item: Club;
  onClose: () => void;
}

export function ClubModal({ item, onClose }: ClubModalProps) {
  const [modalContent, setModalContent] = useState("내용을 불러오는 중...");

  // Spring의 @GetMapping 처럼, 모달 오픈 시 추가 데이터를 받아옴
  useEffect(() => {
    fetch(`/contents/${item.keyword}.txt`)
      .then((res) => {
        if (!res.ok) throw new Error("파일이 없습니다.");
        return res.text();
      })
      .then((text) => setModalContent(text))
      .catch(() => setModalContent("상세 내용을 불러올 수 없습니다."));
  }, [item.keyword]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트가 부모(dim 뒷배경)로 전파되지 않도록 함
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-white">
          <div>
            <span className="text-xs font-bold text-blue-600 mb-1 block">{item.category}</span>
            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="닫기">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8 bg-gray-50 flex-grow">
          <header>
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
            <p className="mt-2 text-sm text-red-500 font-medium">마감일: {item.deadline || "상시"}</p>
          </header>

          <section>
            <h4 className="font-bold text-lg text-gray-800 mb-3 block border-b border-gray-200 pb-2">상세 홍보 내용</h4>
            <div className="bg-white p-5 rounded-xl border border-gray-200 whitespace-pre-wrap text-gray-700 leading-relaxed min-h-[100px]">{modalContent}</div>
          </section>

          <section>
            <h4 className="font-bold text-lg text-gray-800 mb-3 block border-b border-gray-200 pb-2">갤러리 이미지</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 이미지 1~10개를 표시 시도, 실패시 숨기기 처리 */}
              {[...Array(10)].map((_, i) => (
                <img
                  key={i}
                  src={`/image/${item.keyword}${i + 1}.jpg`}
                  alt={`${item.name} 이미지 ${i + 1}`}
                  className="w-full h-auto rounded-xl shadow-sm border border-gray-200 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
