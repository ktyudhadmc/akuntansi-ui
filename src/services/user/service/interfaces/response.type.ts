export interface IGetAllResponse {
  status?: string;
  message?: string;
  data: Service[];
}

export interface IGetResponse {
  status?: string;
  message?: string;
  data: Service;
}

export interface Service {
  id: string;
  name: string;
}
