export const FILE_ACCEPT = {
  csv: {
    "text/csv": [".csv"],
  },
  excel: {
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
  },
} as const;

export type FileAcceptKey= keyof typeof FILE_ACCEPT;
