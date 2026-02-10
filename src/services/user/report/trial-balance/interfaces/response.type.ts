export interface IGetAllTrialBalanceResponse {
  status?: string;
  message?: string;
  data: TrialBalance[];
}

export interface TrialBalance {
  id: string;
  name: string;
  code: string;
  opening_balance: CashFlow;
  closing_balance: CashFlow;
}

interface CashFlow {
  debit: number;
  credit: number;
}
