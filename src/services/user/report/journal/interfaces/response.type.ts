export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: JournalResponse;
}

export interface JournalResponse {
  list: Journal[];
  summary: JournalSummary;
}
export interface Journal {
  id: number;
  date: string;
  document_number: string;
  reff: string;
  description: string;
  type: string;
  amount: number;
  remarks: string;
  account: Account;
  counter_account: Account;
}

export interface JournalSummary {
  total_debit: number;
  total_credit: number;
  is_balanced: boolean;
}

export interface Account {
  id: number;
  code: string;
  name: string;
}
