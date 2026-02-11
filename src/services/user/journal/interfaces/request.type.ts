export interface ICreateGeneralJournalPayload {
  date: string;
  document_number: string;
  reff: string;
  description: string;
  remarks: string;
  amount: number;
  account_id: number;
  counter_account_id: number;
}
export interface IImportJournalPayload {
  file: File;
}
