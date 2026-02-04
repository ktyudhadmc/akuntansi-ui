import dayjs from "dayjs";

export const formatMonthValue = (date = new Date()): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

export const parseMonthValue = (value: string) => {
  const [year, month] = value.split("-");
  return {
    year: Number(year),
    month: Number(month),
  };
};

export const formatDateAsYMD = (date: Date) => dayjs(date).format("YYYY-MM-DD");
export const parseYMDToDate = (ymd: string) =>
  dayjs(ymd, "YYYY-MM-DD").toDate();

export const today = new Date();
export const todayYMDString = formatDateAsYMD(today);
