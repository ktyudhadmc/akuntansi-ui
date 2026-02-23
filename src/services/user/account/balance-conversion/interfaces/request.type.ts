export interface ICreateBalanceConversionPayload {
  balance_conversion: AccountBalance[];
}

export interface AccountBalance {
  account: Account;
  debit: number;
  credit: number;
}

interface Account {
  id: number;
  code: string;
  name: string;
  sub_type: AccountSubType;
}

interface AccountSubType {
  id?: number | null;
  name?: string | null;
}
