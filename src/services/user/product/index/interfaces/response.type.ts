import type { ProductCategory } from "../../category/interfaces/response.type";

export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Product[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Product;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  type: string;
  is_purchasable: boolean;
  is_sellable: boolean;
  is_stock: boolean;
  product_category: ProductCategory;
  units?: ProductUnit[] | null;
}

interface ProductUnit {
  id: number;
  conversion: number;
  unit: Unit;
}

interface Unit {
  id: number;
  name: string;
}
