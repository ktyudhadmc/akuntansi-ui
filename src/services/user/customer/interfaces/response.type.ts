import type { Pagination } from "@services/global/pagination/interfaces/pagination.type";

export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Customer[];
  meta: Pagination; // as pagination
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Customer;
}

export interface Customer {
  id: number;
  name: string;
  code: string;
  parent_unit: string;
  // email: string;
  // phone: string;
  // is_supplier: boolean;
  // is_customer: boolean;
}
