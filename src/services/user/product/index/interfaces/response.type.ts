// import type { ProductCategory } from "../../category/interfaces/response.type";

import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Product[];
  meta: Pagination;
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Product;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  specification: string;
  class: string;
}

// cmivv :)
// export interface Product {
//   id: number;
//   name: string;
//   sku: string;
//   description: string;
//   type: string;
//   is_purchasable: boolean;
//   is_sellable: boolean;
//   is_stock: boolean;
//   product_category: ProductCategory;
//   units?: ProductUnit[] | null;
// }

// interface ProductUnit {
//   id: number;
//   conversion: number;
//   unit: Unit;
// }

// interface Unit {
//   id: number;
//   name: string;
// }
