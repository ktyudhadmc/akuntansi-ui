import type { StateCreator } from "zustand";
import { todayYMString } from "@helpers/index";

export declare interface UserReportPurchaseState {
  purchaseListDate: string;

  setPurchaseListDate: (param: string) => void;
}

const createUserReportPurchaseSlice: StateCreator<UserReportPurchaseState> = (
  set,
) => ({
  /** FILTER */
  purchaseListDate: todayYMString,

  setPurchaseListDate: (param) => set({ purchaseListDate: param }),
});

export default createUserReportPurchaseSlice;
