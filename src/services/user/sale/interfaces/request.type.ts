export interface ICreateSalePayload {
  debit_account_id: string;
  credit_account_id: string;
  payment_due_date: string;
  paid_at: string;
  status: string;
}

export interface IImportSalePayload {
  file: File;
}
