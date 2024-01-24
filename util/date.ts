import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const DATE_TIME_FORMAT = {
  dateWithYearAndLongDayMonth: "dddd, MMMM Do YYYY",
};
export type DateTimeFormat = keyof typeof DATE_TIME_FORMAT;

export const formatDate = (date: Date | string, format: DateTimeFormat) =>
  dayjs(date).format(DATE_TIME_FORMAT[format]);

export const getCurrentTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;
