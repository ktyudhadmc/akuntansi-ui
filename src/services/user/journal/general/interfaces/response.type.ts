export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: GeneralJournal[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: GeneralJournal;
}

export interface GeneralJournal {
  id: number;
  date: string;
  document_number: string;
  reff: string;
  description: string;
  amount: number;
  remarks: string;
  account: Account;
  counter_account: Account;
}

export interface Account {
  id: number;
  code: string;
  name: string;
}
