export interface IGetAllLedgerResponse {
  status?: string;
  message?: string;
  data: Ledger[];
}

export interface IGetLedgerByAccountResponse {
  status?: string;
  message?: string;
  data: LedgerItem[];
}

/** DOMAIN */
export interface Ledger {
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
