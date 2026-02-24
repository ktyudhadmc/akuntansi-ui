import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";
import { todayYMDString, todayYMString } from "@helpers/index";

export declare interface UserBalanceSheetState {
  balanceSheetStartDate: DateOption | null;
  balanceSheetEndDate: DateOption | null;
  balanceSheetDate: string;

  setBalanceSheetStartDate: (param: DateOption | null) => void;
  setBalanceSheetEndDate: (param: DateOption | null) => void;
  setBalanceSheetDate: (param: string) => void;

  resetBalanceSheetFilter: () => void;
}

const createUserBalanceSheetSlice: StateCreator<UserBalanceSheetState> = (
  set,
) => ({
  /** FILTER */
  balanceSheetStartDate: todayYMDString,
  balanceSheetEndDate: todayYMDString,
  balanceSheetDate: todayYMString,

  setBalanceSheetStartDate: (param) => set({ balanceSheetStartDate: param }),
  setBalanceSheetEndDate: (param) => set({ balanceSheetEndDate: param }),
  setBalanceSheetDate: (param) => set({ balanceSheetDate: param }),

  resetBalanceSheetFilter: () =>
    set({
      balanceSheetStartDate: todayYMDString,
      balanceSheetEndDate: todayYMDString,
      balanceSheetDate: todayYMString,
    }),
});

export default createUserBalanceSheetSlice;
