export interface IGetAllTrialBalanceResponse {
  status?: string;
  message?: string;
  data: TrialBalance;
}

export interface TrialBalance {
  total: TrialBalanceTotal;
  accounts: TrialBalanceAccount[];
}

export interface TrialBalanceTotal {
  opening_balance: CashFlow;
  movement_balance: CashFlow;
  closing_balance: CashFlow;
}

export interface TrialBalanceAccount {
  id: string;
  name: string;
  code: string;
  opening_balance: CashFlow;
  movement_balance: CashFlow;
  closing_balance: CashFlow;
}

interface CashFlow {
  debit: number;
  credit: number;
}
