export interface IGetAllBankStatementResponse {
  status?: string;
  message?: string;
  data: BankStatement[];
}

export interface IGetBankStatementResponse {
  status?: string;
  message?: string;
  data: BankStatement;
}

export interface BankStatement {
  id: number;
  date: Date;
  reference: string | null;
  type: string;
  amount: number;
  description: string;
  bank_account: Account;
  counter_account: Account;
}

export interface Account {
  id: number;
  code: string;
  name: string;
  sub_type: AccountSubType;
}

export interface AccountSubType {
  id: number;
  name: string;
}
