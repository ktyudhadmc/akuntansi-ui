export interface IGetAllPeriodLockPreviewResponse {
  status?: string;
  message?: string;
  data: PeriodLockPreview[];
}

export interface PeriodLockPreview {
  id: string;
  code: string;
  name: string;
  trial_balance: Balance | null;
  statement_balance: Balance | null;
  balance_sheet: Balance | null;
}

export interface Balance {
  debit: number;
  credit: number;
}
