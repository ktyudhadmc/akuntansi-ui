import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";
import { todayYMString } from "@helpers/index";

export declare interface UserPurchaseState {
  startTransactionDate: DateOption | null;
  endTransactionDate: DateOption | null;
  startDueDate: DateOption | null;
  endDueDate: DateOption | null;
  supplier: string | null;
  purchaseDate: string;
  setStartTransactionDate: (param: DateOption | null) => void;
  setEndTransactionDate: (param: DateOption | null) => void;
  setStartDueDate: (param: DateOption | null) => void;
  setEndDueDate: (param: DateOption | null) => void;
  setSupplier: (param: string | null) => void;
  setPurchaseDate: (param: string) => void;

  resetPurchaseFilter: () => void;
}

const createUserPurchaseSlice: StateCreator<UserPurchaseState> = (set) => ({
  /** FILTER */
  startTransactionDate: null,
  endTransactionDate: null,
  startDueDate: null,
  endDueDate: null,
  supplier: null,
  purchaseDate: todayYMString,
  setStartTransactionDate: (param) => set({ startTransactionDate: param }),
  setEndTransactionDate: (param) => set({ endTransactionDate: param }),
  setStartDueDate: (param) => set({ startDueDate: param }),
  setEndDueDate: (param) => set({ endDueDate: param }),
  setSupplier: (param) => set({ supplier: param }),
  setPurchaseDate: (param) => set({ purchaseDate: param }),

  resetPurchaseFilter: () =>
    set({
      purchaseDate: todayYMString,
      supplier: null,
    }),
});

export default createUserPurchaseSlice;
