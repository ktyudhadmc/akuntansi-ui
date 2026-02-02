import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";

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
  ledgerStartDate: null,
  ledgerEndDate: null,
  ledgerAccount: null,

  setLedgerStartDate: (param) => set({ ledgerStartDate: param }),
  setLedgerEndDate: (param) => set({ ledgerEndDate: param }),
  setLedgerAccount: (param) => set({ ledgerAccount: param }),

  resetLedgerFilter: () =>
    set({
      ledgerStartDate: null,
      ledgerEndDate: null,
      ledgerAccount: null,
    }),
});

export default createUserLedgerSlice;
