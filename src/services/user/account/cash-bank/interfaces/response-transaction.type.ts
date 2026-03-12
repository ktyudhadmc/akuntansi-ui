export interface IGetAllTransactionResponse {
  status?: string;
  message?: string;
  data: Transaction[];
}

export interface IGetTransactionResponse {
  status?: string;
  message?: string;
  data: Transaction;
}

export interface Transaction {
  id: number;
  date: Date;
  reference: string | null;
  document_number: string | null;
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
  category: AccountSubType;
}

export interface AccountSubType {
  id: number;
  name: string;
}
