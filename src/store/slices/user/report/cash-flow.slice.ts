import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";
import { todayYMDString, todayYMString } from "@helpers/index";

export declare interface UserCashFlowState {
  cashFlowStartDate: DateOption | null;
  cashFlowEndDate: DateOption | null;
  cashFlowDate: string;

  setCashFlowStartDate: (param: DateOption | null) => void;
  setCashFlowEndDate: (param: DateOption | null) => void;
  setCashFlowDate: (param: string) => void;

  resetCashFlowFilter: () => void;
}

const createUserCashFlowSlice: StateCreator<UserCashFlowState> = (set) => ({
  /** FILTER */
  cashFlowStartDate: todayYMDString,
  cashFlowEndDate: todayYMDString,
  cashFlowDate: todayYMString,

  setCashFlowStartDate: (param) => set({ cashFlowStartDate: param }),
  setCashFlowEndDate: (param) => set({ cashFlowEndDate: param }),
  setCashFlowDate: (param) => set({ cashFlowDate: param }),

  resetCashFlowFilter: () =>
    set({
      cashFlowStartDate: todayYMDString,
      cashFlowEndDate: todayYMDString,
      cashFlowDate: todayYMString,
    }),
});

export default createUserCashFlowSlice;
