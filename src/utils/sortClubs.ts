export interface Club {
  name: string;
  keyword: string;
  title: string;
  category: string;
  deadline: string;
  description: string;
  tags: string[];
}

/**
 * 상태 계산 Enum (Spring의 Enum과 유사합니다)
 * OPEN: 마감 안 됨
 * NO_DEADLINE: 마감 없음
 * CLOSED: 마감됨
 */
export const ClubStatus = {
  OPEN: "OPEN",
  NO_DEADLINE: "NO_DEADLINE",
  CLOSED: "CLOSED",
} as const;

export type ClubStatus = (typeof ClubStatus)[keyof typeof ClubStatus];

/**
 * 정렬을 위한 우선순위 정의 (숫자가 작을수록 앞에 옴)
 */
export const ClubStatusPriority: Record<ClubStatus, number> = {
  [ClubStatus.OPEN]: 1,
  [ClubStatus.NO_DEADLINE]: 2,
  [ClubStatus.CLOSED]: 3,
};

/**
 * 게시글의 마감 상태를 반환하는 함수 (Spring의 비즈니스 로직 Service 역할)
 * @param deadline "YYYY-MM-DD" 형태의 문자열 또는 빈 문자열
 * @param currentDate 기준 날짜 "YYYY-MM-DD"
 */
export function getClubStatus(deadline: string, currentDate: string): ClubStatus {
  if (!deadline || deadline.trim() === "") {
    return ClubStatus.NO_DEADLINE;
  }

  // 단순 문자열 비교 ("YYYY-MM-DD" 형식이므로 가능)
  if (deadline >= currentDate) {
    return ClubStatus.OPEN;
  } else {
    return ClubStatus.CLOSED;
  }
}

/**
 * 클럽 리스트를 상태에 따라 정렬합니다.
 * 우선순위: 마감 전 > 마감 없음 > 마감됨
 */
export function sortClubsByStatus(clubs: Club[], currentDate: string): Club[] {
  return [...clubs].sort((a, b) => {
    const statusA = getClubStatus(a.deadline, currentDate);
    const statusB = getClubStatus(b.deadline, currentDate);

    return ClubStatusPriority[statusA] - ClubStatusPriority[statusB];
  });
}
