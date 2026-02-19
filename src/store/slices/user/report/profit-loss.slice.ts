import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";
import { todayYMDString, todayYMString } from "@helpers/index";

export declare interface UserProfitLossState {
  profitLossStartDate: DateOption | null;
  profitLossEndDate: DateOption | null;
  profitLossDate: string;

  setProfitLossStartDate: (param: DateOption | null) => void;
  setProfitLossEndDate: (param: DateOption | null) => void;
  setProfitLossDate: (param: string) => void;

  resetProfitLossFilter: () => void;
}

const createUserProfitLossSlice: StateCreator<UserProfitLossState> = (set) => ({
  /** FILTER */
  profitLossStartDate: todayYMDString,
  profitLossEndDate: todayYMDString,
  profitLossDate: todayYMString,

  setProfitLossStartDate: (param) => set({ profitLossStartDate: param }),
  setProfitLossEndDate: (param) => set({ profitLossEndDate: param }),
  setProfitLossDate: (param) => set({ profitLossDate: param }),

  resetProfitLossFilter: () =>
    set({
      profitLossStartDate: todayYMDString,
      profitLossEndDate: todayYMDString,
      profitLossDate: todayYMString,
    }),
});

export default createUserProfitLossSlice;
