import type { StateCreator } from "zustand";
import { todayYMString } from "@helpers/index";

export declare interface UserReportSaleState {
  saleListDate: string;
  saleByCustomerDate: string;

  setSaleListDate: (param: string) => void;
  setSaleByCustomerDate: (param: string) => void;
}

const createUserReportSaleSlice: StateCreator<UserReportSaleState> = (set) => ({
  /** FILTER */
  saleListDate: todayYMString,
  saleByCustomerDate: todayYMString,

  setSaleListDate: (param) => set({ saleListDate: param }),
  setSaleByCustomerDate: (param) => set({ saleByCustomerDate: param }),
});

export default createUserReportSaleSlice;
