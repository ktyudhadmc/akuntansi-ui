export interface ICreateTransactionPayload {
  account_id: number;
  counter_account_id: number;
  date: string;
  amount: string;
  type: string;
  reference: string;
  description: string;
}

export interface ICreateIntegrationBankAccountPayload {
  account_id: number;
  type: string;
  is_active: boolean;
}

export interface IImportBankStatementPayload {
  file: File;
}

export interface IBulkDeleteBankStatementPayload {
  ids: (number | string)[];
}
