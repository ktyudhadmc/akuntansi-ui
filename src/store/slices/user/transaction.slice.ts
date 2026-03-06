import type { StateCreator } from "zustand";
import { todayYMString } from "@helpers/date";

export declare interface UserTransactionState {
  transactionDate: string;
  transactionType: string;
  transactionStatus: string;

  setTransactionDate: (param: string) => void;
  setTransactionType: (param: string) => void;
  setTransactionStatus: (param: string) => void;

  resetTransactionFilter: () => void;
}

const createUserTransactionSlice: StateCreator<UserTransactionState> = (
  set,
) => ({
  /** FILTER */
  transactionDate: todayYMString,
  transactionType: "",
  transactionStatus: "",

  setTransactionDate: (param) => set({ transactionDate: param }),
  setTransactionType: (param) => set({ transactionType: param }),
  setTransactionStatus: (param) => set({ transactionStatus: param }),

  resetTransactionFilter: () =>
    set({
      transactionDate: todayYMString,
      transactionType: "",
      transactionStatus: "",
    }),
});

export default createUserTransactionSlice;
