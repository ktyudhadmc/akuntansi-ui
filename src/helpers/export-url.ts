import config from "@constants/config";

interface ExportParams {
  type?: "pdf" | "xlsx" | "csv";
  mode?: "view" | "download";
  startDate?: string;
  endDate?: string;
  [key: string]: string | undefined; // untuk param tambahan
}

function buildExportUrl(path: string, params: ExportParams = {}): string {
  const url = new URL(`${config.BASE_API_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
}

export const ExportUrl = {
  profitLoss: (params: ExportParams = {}) =>
    buildExportUrl("/reports/profit-loss", params),
  balanceSheet: (params: ExportParams = {}) =>
    buildExportUrl("/reports/balance-sheet", params),
  cashFlow: (params: ExportParams = {}) =>
    buildExportUrl("/reports/cash-flow", params),
} as const;
