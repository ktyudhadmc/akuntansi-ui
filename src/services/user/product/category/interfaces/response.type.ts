export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: ProductCategory[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: ProductCategory;
}

export interface ProductCategory {
  id: number;
  name: string;
}
