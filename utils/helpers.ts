export function daysUntilNext(month: number, day: number): number {
  var tday: Date = new Date(),
    y: number = tday.getFullYear(),
    next: Date = new Date(y, month - 1, day);
  tday.setHours(0, 0, 0, 0);
  if (tday > next) next.setFullYear(y + 1);
  return Math.round((next.getTime() - tday.getTime()) / 8.64e7);
}
