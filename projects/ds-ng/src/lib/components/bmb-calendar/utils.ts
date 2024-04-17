import { DateTime } from "luxon";

export const getWeekDays = (date: DateTime): DateTime[] => {
  const currentWeek = DateTime.fromObject({
    weekYear: date.year,
    weekNumber: date.weekNumber,
  });
  const firstWeekDay = currentWeek.startOf('week');

  let weekDays = [];

  for (let day = -1; day <= 5; day++) {
    weekDays.push(firstWeekDay.plus({ days: day }))
  }

  return weekDays;
}

export const orderDayNames = (days: (string | undefined)[]): (string | undefined)[] => {
  const lastElement: (string | undefined) = days.pop();
  days.unshift(lastElement);
  return days;
}
