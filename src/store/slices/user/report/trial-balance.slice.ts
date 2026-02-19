import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";
import { todayYMDString, todayYMString } from "@helpers/index";

export declare interface UserTrialBalanceState {
  trialBalanceStartDate: DateOption | null;
  trialBalanceEndDate: DateOption | null;
  trialBalanceAccount: String | null;
  trialBalanceDate: string;

  setTrialBalanceStartDate: (param: DateOption | null) => void;
  setTrialBalanceEndDate: (param: DateOption | null) => void;
  setTrialBalanceDate: (param: string) => void;
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
  trialBalanceDate: todayYMString,

  setTrialBalanceStartDate: (param) => set({ trialBalanceStartDate: param }),
  setTrialBalanceEndDate: (param) => set({ trialBalanceEndDate: param }),
  setTrialBalanceAccount: (param) => set({ trialBalanceAccount: param }),
  setTrialBalanceDate: (param) => set({ trialBalanceDate: param }),

  resetTrialBalanceFilter: () =>
    set({
      trialBalanceStartDate: todayYMDString,
      trialBalanceEndDate: todayYMDString,
      trialBalanceDate: todayYMString,
      trialBalanceAccount: null,
    }),
});

export default createUserTrialBalanceSlice;
