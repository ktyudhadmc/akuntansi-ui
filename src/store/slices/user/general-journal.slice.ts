import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";

export declare interface UserGeneralJournalState {
  startDate: DateOption | null;
  endDate: DateOption | null;
  account: String | null;

  setStartDate: (param: DateOption | null) => void;
  setEndDate: (param: DateOption | null) => void;
  setAccount: (param: String | null) => void;
}

const createUserGeneralJournalSlice: StateCreator<UserGeneralJournalState> = (
  set,
) => ({
  /** FILTER */
  startDate: null,
  endDate: null,
  account: null,

  setStartDate: (param) => set({ startDate: param }),
  setEndDate: (param) => set({ endDate: param }),
  setAccount: (param) => set({ account: param }),
});

export default createUserGeneralJournalSlice;
