export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Inventory[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Inventory;
}

export interface Inventory {
  id: string;
  material?: Product;
  date: string;
  qty: number;
  type: string;
  category: string;
  price: number;
  description: string;
}

export interface Product {
  id: string;
  name: string;
}
