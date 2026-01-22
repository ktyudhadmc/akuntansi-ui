import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";

export declare interface UserPurchaseState {
  startTransactionDate: DateOption | null;
  endTransactionDate: DateOption | null;
  startDueDate: DateOption | null;
  endDueDate: DateOption | null;
  setStartTransactionDate: (param: DateOption | null) => void;
  setEndTransactionDate: (param: DateOption | null) => void;
  setStartDueDate: (param: DateOption | null) => void;
  setEndDueDate: (param: DateOption | null) => void;
}

const createUserPurchaseSlice: StateCreator<UserPurchaseState> = (set) => ({
  /** FILTER */
  startTransactionDate: null,
  endTransactionDate: null,
  startDueDate: null,
  endDueDate: null,
  setStartTransactionDate: (param) => set({ startTransactionDate: param }),
  setEndTransactionDate: (param) => set({ endTransactionDate: param }),
  setStartDueDate: (param) => set({ startDueDate: param }),
  setEndDueDate: (param) => set({ endDueDate: param }),
});

export default createUserPurchaseSlice;
