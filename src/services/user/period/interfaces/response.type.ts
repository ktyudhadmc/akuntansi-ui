export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: AccountPeriod[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: AccountPeriod;
}

export interface AccountPeriod {
  id: number;
  code: string;
  name: string;
  is_posting: boolean;
  normal_balance: string;
  report_type: string;
}
