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
  name: string;
}
