interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function FilterBar({ searchQuery, setSearchQuery, categories, selectedCategory, setSelectedCategory }: FilterBarProps) {
  return (
    <div className="mb-8 space-y-4 max-w-3xl mx-auto">
      {/* 검색어 입력창 */}
      <input
        type="text"
        placeholder="검색어를 입력하세요 (이름, 키워드 등 통합 검색)"
        className="w-full bg-white p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* 카테고리 필터 버튼 */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm
              ${selectedCategory === cat ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"}
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
