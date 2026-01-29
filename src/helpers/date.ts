import dayjs from "dayjs";
import type { DateOption } from "@def/option";

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

export const formatDateYMD = (date: Date) => dayjs(date).format("YYYY-MM-DD");
export const parseYMDToDate = (ymd: string) => dayjs(ymd, "YYYY-MM-DD").toDate();

export function formatDateInput(
  date?: DateOption,
  format: "date" | "month" = "date",
) {
  if (!date) return "";

  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  return format === "month" ? `${yyyy}-${mm}` : `${yyyy}-${mm}-${dd}`;
}
