export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Usage[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Usage;
}

export interface Usage {
  id: string;
  material: Product;
  date: string;
  qty: number;
  description: string;
}

export interface Product {
  id: string;
  name: string;
}
