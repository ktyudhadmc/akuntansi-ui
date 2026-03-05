import type { StateCreator } from "zustand";
import { todayYMString } from "@helpers/index";

export declare interface UserReportPurchaseState {
  purchaseListDate: string;
  purchaseBySupplierDate: string;
  purchaseSupplierBalanceDate: string;
  purchaseExpenseListDate: string;
  purchaseExpenseDetailDate: string;

  setPurchaseListDate: (param: string) => void;
  setPurchaseBySupplierDate: (param: string) => void;
  setPurchaseSupplierBalanceDate: (param: string) => void;
  setPurchaseExpenseListDate: (param: string) => void;
  setPurchaseExpenseDetailDate: (param: string) => void;
}

const createUserReportPurchaseSlice: StateCreator<UserReportPurchaseState> = (
  set,
) => ({
  /** FILTER */
  purchaseListDate: todayYMString,
  purchaseBySupplierDate: todayYMString,
  purchaseSupplierBalanceDate: todayYMString,
  purchaseExpenseListDate: todayYMString,
  purchaseExpenseDetailDate: todayYMString,

  setPurchaseListDate: (param) => set({ purchaseListDate: param }),
  setPurchaseBySupplierDate: (param) => set({ purchaseBySupplierDate: param }),
  setPurchaseSupplierBalanceDate: (param) =>
    set({ purchaseSupplierBalanceDate: param }),
  setPurchaseExpenseListDate: (param) =>
    set({ purchaseExpenseListDate: param }),
  setPurchaseExpenseDetailDate: (param) =>
    set({ purchaseExpenseDetailDate: param }),
});

export default createUserReportPurchaseSlice;
