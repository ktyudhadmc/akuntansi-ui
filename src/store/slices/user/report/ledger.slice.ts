import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";
import { todayYMDString, todayYMString } from "@helpers/index";

export declare interface UserLedgerState {
  ledgerStartDate: DateOption | null;
  ledgerEndDate: DateOption | null;
  ledgerAccount: String | null;
  ledgerDate: string;

  setLedgerStartDate: (param: DateOption | null) => void;
  setLedgerEndDate: (param: DateOption | null) => void;
  setLedgerAccount: (param: string | null) => void;
  setLedgerDate: (param: string) => void;

  resetLedgerFilter: () => void;
}

const createUserLedgerSlice: StateCreator<UserLedgerState> = (set) => ({
  /** FILTER */
  ledgerStartDate: todayYMDString,
  ledgerEndDate: todayYMDString,
  ledgerAccount: null,
  ledgerDate: todayYMString,

  setLedgerStartDate: (param) => set({ ledgerStartDate: param }),
  setLedgerEndDate: (param) => set({ ledgerEndDate: param }),
  setLedgerAccount: (param) => set({ ledgerAccount: param }),
  setLedgerDate: (param) => set({ ledgerDate: param }),

  resetLedgerFilter: () =>
    set({
      ledgerStartDate: todayYMDString,
      ledgerEndDate: todayYMDString,
      ledgerAccount: null,
      ledgerDate: todayYMString,
    }),
});

export default createUserLedgerSlice;
