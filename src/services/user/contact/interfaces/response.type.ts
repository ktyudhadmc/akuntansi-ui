export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Contact[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Contact;
}

export interface Contact {
  id: number;
  name: string;
  code: string;
  email: string;
  phone: string;
  is_supplier: boolean;
  is_customer: boolean;
}
