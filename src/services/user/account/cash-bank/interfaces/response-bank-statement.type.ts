export interface IGetAllBankStatementResponse {
  status?: string;
  message?: string;
  data: BankStatement[];
}

export interface BankStatement {
  id: string;
  date: string;
  reference: string | null;
  type: string;
  amount: number;
  description: string;
  bank_account: Account;
  counter_account: Account;
}

export interface Account {
  id: string;
  code: string;
  name: string;
}
