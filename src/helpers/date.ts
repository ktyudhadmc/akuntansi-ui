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

export const parseMonthAndRange = (value: string) => {
  const base = dayjs(value + "-01");

  return {
    year: base.year(),
    month: base.month() + 1,
    start_date: base.startOf("month").format("YYYY-MM-DD"),
    end_date: base.endOf("month").format("YYYY-MM-DD"),
  };
};

export const formatDateAsYMD = (date: Date) => dayjs(date).format("YYYY-MM-DD");
export const formatDateAsYM = (date: Date) => dayjs(date).format("YYYY-MM");
export const parseYMDToDate = (ymd: string) =>
  dayjs(ymd, "YYYY-MM-DD").toDate();

export const today = new Date();
export const todayYMDString = formatDateAsYMD(today);
export const todayYMString = formatDateAsYM(today);
