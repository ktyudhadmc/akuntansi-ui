export interface IGetAllCashFlowResponse {
  status?: string;
  message?: string;
  data: CashFlowResponse;
}

export interface CashFlowResponse {
  summary: CashFlowSummary;
  cashflows: CashFlow[];
}

/** cashflow core */
export interface CashFlow {
  type: string;
  amount: number;
  child: CashflowItem[];
}

export interface CashflowItem {
  name: string;
  amount: number;
}

/** cashflow summary */
export interface CashFlowSummary {
  opening_balance: Balance;
  cash_movement: Balance;
  closing_balance: Balance;
}

interface Balance {
  debit: number;
  credit: number;
}
