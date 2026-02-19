export interface IGetReportProfitLossResponse {
  status?: string;
  message?: string;
  data: ProfitLoss[];
}

/** profit loss core */
export interface ProfitLoss {
  type: string;
  amount: number;
  child: ProfitLossItem[];
}

export interface ProfitLossItem {
  name: string;
  amount: number;
}
