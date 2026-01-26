export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Adjustment[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Adjustment;
}

export interface Adjustment {
  id: string;
  material?: Product;
  date: string;
  qty: number;
  type: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
}
