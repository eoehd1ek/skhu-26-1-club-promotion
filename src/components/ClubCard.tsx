import type { Club } from "../types";
import { getClubStatus, ClubStatus } from "../utils/sortClubs";

interface ClubCardProps {
  item: Club;
  onClick: () => void;
}

export function ClubCard({ item, onClick }: ClubCardProps) {
  const status = getClubStatus(item.deadline, new Date().toISOString().split("T")[0]);

  // 마감 처리 표시용 UI 상태 (마감됨 이면 투명도를 주거나 "마감" 표시를 추가할 수 있습니다)
  const isClosed = status === ClubStatus.CLOSED;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full ${
        isClosed ? "opacity-60" : ""
      }`}
    >
      <div className="p-5 sm:p-6 flex-grow flex flex-col">
        {/* 상단 (카테고리 & 마감일) */}
        <div className="w-full flex items-center justify-between mb-4">
          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-md shrink-0">{item.category}</span>
          <span className={`text-xs font-medium shrink-0 whitespace-nowrap text-right ${isClosed ? "text-red-500 font-bold" : "text-gray-500"}`}>
            {isClosed ? "마감됨" : item.deadline ? `마감: ${item.deadline}` : "마감: 상시모집"}
          </span>
        </div>

        {/* 중단 (제목 & 텍스트 & 이미지) */}
        <div className="flex flex-row gap-4 sm:gap-6 flex-grow mb-4">
          <div className="flex-1 flex flex-col min-w-0">
            <h2 className="text-xl font-bold text-gray-900 mb-1 truncate">{item.name}</h2>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 line-clamp-2">{item.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-3 whitespace-normal">{item.description}</p>
          </div>
          <div className="shrink-0 flex items-start">
            <img
              src={`/image/${item.keyword}1.jpg`}
              alt={`${item.name} 대표 이미지`}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl shadow-sm border border-gray-200 block"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* 하단 (태그 목록) */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-gray-100 w-full">
            {item.tags.map((tag) => (
              <span key={tag} className="text-[11px] text-gray-500 bg-gray-100 px-2 py-1 rounded break-words">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
