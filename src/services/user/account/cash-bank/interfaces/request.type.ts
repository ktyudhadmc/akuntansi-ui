export interface ICreateAccountPayload {
  company_id: number;
  code: string;
  name: string;
  is_posting: boolean;
  normal_balance: string;
  report_type: string;
}

export interface ICreateIntegrationBankAccountPayload {
  account_id: number;
  type: string;
  is_active: boolean;
}

export interface IImportBankStatementPayload {
  file: File;
}
