import { describe, it, expect } from "vitest";
import { getClubStatus, sortClubsByStatus, ClubStatus, type Club } from "./sortClubs";

describe("sortClubs 단위 테스트 (Unit Tests)", () => {
  // JUnit의 @Test 애노테이션과 유사하게 작동합니다.
  describe("getClubStatus (상태 계산 테스트)", () => {
    const currentDate = "2026-04-29";

    it("마감일이 없고 빈 문자열일 때 NO_DEADLINE을 반환해야 합니다.", () => {
      expect(getClubStatus("", currentDate)).toBe(ClubStatus.NO_DEADLINE);
      expect(getClubStatus("   ", currentDate)).toBe(ClubStatus.NO_DEADLINE);
    });

    it("마감일이 기준 날짜보다 미래라면 OPEN을 반환해야 합니다.", () => {
      expect(getClubStatus("2026-05-01", currentDate)).toBe(ClubStatus.OPEN);
    });

    it("마감일이 기준 날짜와 동일하다면 OPEN을 반환해야 합니다.", () => {
      expect(getClubStatus("2026-04-29", currentDate)).toBe(ClubStatus.OPEN);
    });

    it("마감일이 기준 날짜보다 과거라면 CLOSED를 반환해야 합니다.", () => {
      expect(getClubStatus("2026-04-28", currentDate)).toBe(ClubStatus.CLOSED);
    });
  });

  describe("sortClubsByStatus (정렬 로직 테스트)", () => {
    const currentDate = "2026-04-29";

    const mockData: Club[] = [
      { category: "A", name: "마감됨", keyword: "1", title: "", deadline: "2026-04-28", description: "", tags: [] },
      { category: "B", name: "마감 없음", keyword: "2", title: "", deadline: "", description: "", tags: [] },
      { category: "C", name: "마감 안 됨", keyword: "3", title: "", deadline: "2026-05-01", description: "", tags: [] },
      { category: "D", name: "마감 오늘", keyword: "4", title: "", deadline: "2026-04-29", description: "", tags: [] },
    ];

    it("마감 안 됨 -> 마감 없음 -> 마감됨 순서로 정렬되어야 합니다.", () => {
      const sorted = sortClubsByStatus(mockData, currentDate);

      // 검증 로직 (Spring에서 Assert.assertEquals 역할)
      expect(sorted[0].name).toBe("마감 안 됨");
      expect(sorted[1].name).toBe("마감 오늘"); // 오늘 날짜도 열림(OPEN) 상태
      expect(sorted[2].name).toBe("마감 없음");
      expect(sorted[3].name).toBe("마감됨");
    });
  });
});
