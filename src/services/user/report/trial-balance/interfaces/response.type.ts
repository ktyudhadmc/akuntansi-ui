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
  opening_balance: Balance;
  movement_balance: Balance;
  closing_balance: Balance;
}

export interface TrialBalanceAccount {
  id: string;
  name: string;
  code: string;
  opening_balance: Balance;
  movement_balance: Balance;
  closing_balance: Balance;
}

interface Balance {
  debit: number;
  credit: number;
}
