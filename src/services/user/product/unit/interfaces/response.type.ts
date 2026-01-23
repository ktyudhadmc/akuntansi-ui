export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Unit[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Unit;
}

export interface Unit {
  id: string;
  code: string;
  name: string;
}
