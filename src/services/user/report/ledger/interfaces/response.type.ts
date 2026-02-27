export interface IGetAllLedgerResponse {
  status?: string;
  message?: string;
  data: LedgerDataResponse;
}

export interface IGetLedgerByAccountResponse {
  status?: string;
  message?: string;
  data: LedgerResponse;
}

export interface IGetAllLedgerAccountResponse {
  status?: string;
  message?: string;
  data: LedgerAccount[];
}

export interface IGetLedgerByAccountResponseOld {
  status?: string;
  message?: string;
  data: LedgerItem[];
}

/** SPECIAL RESPONSE :) */
export interface LedgerDataResponse {
  account: LedgerAllResponse[];
  summary: LedgerSummary;
}
export interface LedgerAllResponse {
  id: string;
  code: string;
  name: string;
  children: LedgerItemWithBalance[];
}

export interface LedgerSummary {
  opening_balance: number;
  debit_transaction: number;
  credit_transaction: number;
  closing_balance: number;
}

export interface LedgerItemWithBalance extends Account {
  debit: number;
  credit: number;
  balance: number;
  opening_balance: number;
  period_date: string;
  transactions: LedgerItemTransaction[];
}

export interface LedgerItemTransaction {
  id: string;
  date: Date;
  type: string;
  document_number: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

/** transaction */

export interface LedgerResponse {
  mutation: Ledger[];
  balance: Balance;
}

export interface LedgerAccount {
  id: string;
  code: string;
  name: string;
  children: AccountWithBalance[];
}

export interface AccountWithBalance extends Account {
  debit: number;
  credit: number;
  balance: number;
  opening_balance: number;
  period_date: string;
}

/** DOMAIN */
export interface Ledger {
  id: number;
  date: string;
  type: string;
  document_number: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}
export interface LedgerOld {
  account: Account;
  ledgers: LedgerItem[];
}

export interface LedgerItem {
  id: string;
  journal: Journal;
  debit: number;
  credit: number;
  balance: number;
}

/** SUPPORT */
export interface Account {
  id: string;
  code: string;
  name: string;
}

export interface Journal {
  id: string;
  recorded_at: string;
  number: string;
  description: string;
}

export interface Balance {
  opening_balance: number;
  total_debit: number;
  total_credit: number;
  closing_balance: number;
}
