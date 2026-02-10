import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";
import { todayYMDString } from "@helpers/index";

export declare interface UserTrialBalanceState {
  trialBalanceStartDate: DateOption | null;
  trialBalanceEndDate: DateOption | null;
  trialBalanceAccount: String | null;

  setTrialBalanceStartDate: (param: DateOption | null) => void;
  setTrialBalanceEndDate: (param: DateOption | null) => void;
  setTrialBalanceAccount: (param: String | null) => void;

  resetTrialBalanceFilter: () => void;
}

const createUserTrialBalanceSlice: StateCreator<UserTrialBalanceState> = (
  set,
) => ({
  /** FILTER */
  trialBalanceStartDate: todayYMDString,
  trialBalanceEndDate: todayYMDString,
  trialBalanceAccount: null,

  setTrialBalanceStartDate: (param) => set({ trialBalanceStartDate: param }),
  setTrialBalanceEndDate: (param) => set({ trialBalanceEndDate: param }),
  setTrialBalanceAccount: (param) => set({ trialBalanceAccount: param }),

  resetTrialBalanceFilter: () =>
    set({
      trialBalanceStartDate: todayYMDString,
      trialBalanceEndDate: todayYMDString,
      trialBalanceAccount: null,
    }),
});

export default createUserTrialBalanceSlice;
