import type { StateCreator } from "zustand";
import { todayYMString } from "@helpers/index";

export declare interface UserReportSaleState {
  saleListDate: string;
  saleByCustomerDate: string;
  saleCustomerBalanceDate: string;

  setSaleListDate: (param: string) => void;
  setSaleByCustomerDate: (param: string) => void;
  setSaleCustomerBalanceDate: (param: string) => void;
}

const createUserReportSaleSlice: StateCreator<UserReportSaleState> = (set) => ({
  /** FILTER */
  saleListDate: todayYMString,
  saleByCustomerDate: todayYMString,
  saleCustomerBalanceDate: todayYMString,

  setSaleListDate: (param) => set({ saleListDate: param }),
  setSaleByCustomerDate: (param) => set({ saleByCustomerDate: param }),
  setSaleCustomerBalanceDate: (param) =>
    set({ saleCustomerBalanceDate: param }),
});

export default createUserReportSaleSlice;
