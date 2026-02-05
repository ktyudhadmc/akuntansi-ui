export interface IGetAllLedgerResponse {
  status?: string;
  message?: string;
  data: LedgerAllResponse[];
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
export interface LedgerAllResponse {
  id: string;
  code: string;
  name: string;
  children: LedgerItemWithBalance[];
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
  mutations: Ledger[];
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
  date: string;
  transaction: Transaction;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface Transaction {
  id: string;
  type: string;
  document_number: string;
  // description: string;
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
  opening: string;
  closing: string;
}
