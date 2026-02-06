export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Tax[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Tax;
}

export interface Tax {
  id: string;
  name: string;
  rate: number;
  is_active: boolean;
  purchase_account: Account;
  sales_account: Account;
}

interface Account {
  id: string;
  code: string;
  name: string;
}
