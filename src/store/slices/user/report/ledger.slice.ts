import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";
import { todayYMDString } from "@helpers/index";

export declare interface UserLedgerState {
  ledgerStartDate: DateOption | null;
  ledgerEndDate: DateOption | null;
  ledgerAccount: String | null;

  setLedgerStartDate: (param: DateOption | null) => void;
  setLedgerEndDate: (param: DateOption | null) => void;
  setLedgerAccount: (param: String | null) => void;

  resetLedgerFilter: () => void;
}

const createUserLedgerSlice: StateCreator<UserLedgerState> = (set) => ({
  /** FILTER */
  ledgerStartDate: todayYMDString,
  ledgerEndDate: todayYMDString,
  ledgerAccount: null,

  setLedgerStartDate: (param) => set({ ledgerStartDate: param }),
  setLedgerEndDate: (param) => set({ ledgerEndDate: param }),
  setLedgerAccount: (param) => set({ ledgerAccount: param }),

  resetLedgerFilter: () =>
    set({
      ledgerStartDate: todayYMDString,
      ledgerEndDate: todayYMDString,
      ledgerAccount: null,
    }),
});

export default createUserLedgerSlice;
