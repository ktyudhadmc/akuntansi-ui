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
