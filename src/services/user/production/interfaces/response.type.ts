export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Production[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Production;
}

export interface Production {
  id: string;
  date: string;
  description: string;
  items: ProductUsage[];
}

interface ProductUsage {
  qty: number;
  type: string;
  material: Product;
  unit: Unit;
}

interface Product {
  id: string;
  name: string;
}

interface Unit {
  id: string;
  name: string;
}
