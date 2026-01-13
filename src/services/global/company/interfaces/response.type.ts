export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Company[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Company;
}

export interface Company {
  id: number;
  code: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}
