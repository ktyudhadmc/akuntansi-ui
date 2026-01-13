export interface IGetResponse {
  status?: string;
  message: string;
  data: Company;
}

export interface Company {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}
