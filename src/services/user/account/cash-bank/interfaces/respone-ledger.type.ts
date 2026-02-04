export interface IGetLedgerByAccountResponse {
  status?: string;
  message?: string;
  data: LedgerResponse;
}

/** SPECIAL RESPONSE :) */
export interface LedgerResponse {
  mutations: Ledger[];
  balance: Balance;
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

export interface Balance {
  opening: string;
  closing: string;
}
