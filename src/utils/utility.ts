import dayjs from "dayjs";

// wait
export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// 日付計算
// 年齢を計算する関数
export function calculateAge(
  birthDate: Date | null | undefined,
  baseDate?: Date | null | undefined
): number | undefined {
  if (!birthDate) return undefined;

  const base = baseDate ? dayjs(baseDate) : dayjs();

  const birthDateJs = dayjs(birthDate);

  return base.diff(birthDateJs, "year");
}
