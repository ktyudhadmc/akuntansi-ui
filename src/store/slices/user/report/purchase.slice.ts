import type { StateCreator } from "zustand";
import { todayYMString } from "@helpers/index";

export declare interface UserReportPurchaseState {
  purchaseListDate: string;
  purchaseBySupplierDate: string;
  purchaseSupplierBalanceDate: string;

  setPurchaseListDate: (param: string) => void;
  setPurchaseBySupplierDate: (param: string) => void;
  setPurchaseSupplierBalanceDate: (param: string) => void;
}

const createUserReportPurchaseSlice: StateCreator<UserReportPurchaseState> = (
  set,
) => ({
  /** FILTER */
  purchaseListDate: todayYMString,
  purchaseBySupplierDate: todayYMString,
  purchaseSupplierBalanceDate: todayYMString,

  setPurchaseListDate: (param) => set({ purchaseListDate: param }),
  setPurchaseBySupplierDate: (param) => set({ purchaseBySupplierDate: param }),
  setPurchaseSupplierBalanceDate: (param) =>
    set({ purchaseSupplierBalanceDate: param }),
});

export default createUserReportPurchaseSlice;
