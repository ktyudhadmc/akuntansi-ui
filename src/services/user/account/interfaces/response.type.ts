export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Account[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Account;
}

export interface Account {
  id: number;
  code: string;
  name: string;
}
