import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";
import { todayYMDString, todayYMString } from "@helpers/index";

export declare interface UserGeneralJournalState {
  startDate: DateOption | null;
  endDate: DateOption | null;
  journalAccount: String | null;

  journalDate: string;

  setStartDate: (param: DateOption | null) => void;
  setEndDate: (param: DateOption | null) => void;
  setJournalAccount: (param: String | null) => void;
  setJournalDate: (param: string) => void;

  resetJournalFilter: () => void;
}

const createUserGeneralJournalSlice: StateCreator<UserGeneralJournalState> = (
  set,
) => ({
  /** FILTER */
  startDate: todayYMDString,
  endDate: todayYMDString,
  journalAccount: null,
  journalDate: todayYMString,

  setStartDate: (param) => set({ startDate: param }),
  setEndDate: (param) => set({ endDate: param }),
  setJournalAccount: (param) => set({ journalAccount: param }),
  setJournalDate: (param) => set({ journalDate: param }),

  resetJournalFilter: () =>
    set({
      journalAccount: null,
      journalDate: todayYMString
    }),
});

export default createUserGeneralJournalSlice;
