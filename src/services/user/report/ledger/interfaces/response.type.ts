export interface IGetAllLedgerResponse {
  status?: string;
  message?: string;
  data: LedgerResponse;
}

export interface IGetLedgerByAccountResponse {
  status?: string;
  message?: string;
  data: LedgerResponse;
}

export interface IGetLedgerByAccountResponseOld {
  status?: string;
  message?: string;
  data: LedgerItem[];
}

/** SPECIAL RESPONSE :) */
export interface LedgerResponse {
  mutations: Ledger[];
  balance: Balance;
}

/** DOMAIN */
export interface Ledger {
  date: string;
  // transaction: Transaction;
  type: string;
  document_number: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface Transaction {
  id: string;
  type: string;
  document_number: string;
  description: string;
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
