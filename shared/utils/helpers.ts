import { IUser } from "../models/User";

export function daysUntilNext(month: number, day: number): number {
  var tday: Date = new Date(),
    y: number = tday.getFullYear(),
    next: Date = new Date(y, month - 1, day);
  tday.setHours(0, 0, 0, 0);
  if (tday > next) next.setFullYear(y + 1);
  return Math.round((next.getTime() - tday.getTime()) / 8.64e7);
}

export function getUsersWithDaysUntilBirthday(users: IUser[]) {
  return users.map((user: IUser) => {
    const birthDate: Date = new Date(user.birthDate);
    user.daysUntilNextBirthDate = daysUntilNext(
      birthDate.getMonth() + 1,
      birthDate.getDate()
    );

    return user;
  });
}

export function sortUsers(users: IUser[]) {
  users.sort(function (a: any, b: any) {
    return a.daysUntilNextBirthDate - b.daysUntilNextBirthDate;
  });
}

export function getFormattedUsers(users: IUser[]) {
  let res = getUsersWithDaysUntilBirthday(users);
  sortUsers(res);
  return res;
}
