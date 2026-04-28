import { useState, useEffect, useMemo } from "react";
import type { Club } from "./types";
import { sortClubsByStatus } from "./utils/sortClubs";
import { ClubCard } from "./components/ClubCard";
import { ClubModal } from "./components/ClubModal";
import { Footer } from "./components/Footer";
import { FilterBar } from "./components/FilterBar";

/**
 * Spring MVC의 Controller처럼 전체 UI의 상태(Model)와 렌더링(View)을 조율합니다.
 */
function App() {
  const [data, setData] = useState<Club[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItem, setSelectedItem] = useState<Club | null>(null);

  // 컴포넌트가 처음 화면에 나타날 때 한 번 데이터를 불러옵니다 (@PostConstruct 느낌)
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((jsonData: Club[]) => setData(jsonData))
      .catch((err) => console.error("데이터를 불러오는데 실패했습니다.", err));
  }, []);

  // 카테고리 목록 추출
  const categories = useMemo(() => {
    const cats = data.map((item) => item.category).filter(Boolean);
    return ["전체", ...new Set(cats)];
  }, [data]);

  const finalFilteredData = useMemo(() => {
    // 1. 필터
    const filtered = data.filter((item) => {
      const matchCategory = selectedCategory === "전체" || item.category === selectedCategory;
      const lowerQuery = searchQuery.toLowerCase();
      const matchSearch = Object.values(item).some((val) => val != null && String(val).toLowerCase().includes(lowerQuery));
      return matchCategory && matchSearch;
    });

    // 2. 정렬 로직 적용
    const today = new Date().toISOString().split("T")[0];
    return sortClubsByStatus(filtered, today);
  }, [data, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 font-sans">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-900">성공회대학교 동아리 / 소모임 홍보</h1>

        {/* 필터 바 컴포넌트 */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalFilteredData.map((item) => (
            <ClubCard key={item.keyword} item={item} onClick={() => setSelectedItem(item)} />
          ))}

          {finalFilteredData.length === 0 && <div className="col-span-full text-center py-12 text-gray-500">조건에 맞는 항목이 없습니다.</div>}
        </div>

        {selectedItem && <ClubModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
