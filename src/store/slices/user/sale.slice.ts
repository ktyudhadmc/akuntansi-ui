import type { StateCreator } from "zustand";
import type { DateOption } from "@def/option";
import { todayYMString } from "@helpers/date";

export declare interface UserSaleState {
  saleStartTransactionDate: DateOption | null;
  saleEndTransactionDate: DateOption | null;
  saleStartDueDate: DateOption | null;
  saleEndDueDate: DateOption | null;
  customer: string | null;
  saleDate: string;
  setSaleStartTransactionDate: (param: DateOption | null) => void;
  setSaleEndTransactionDate: (param: DateOption | null) => void;
  setSaleStartDueDate: (param: DateOption | null) => void;
  setSaleEndDueDate: (param: DateOption | null) => void;
  setCustomer: (param: string | null) => void;
  setSaleDate: (param: string) => void;
}

const createUserSaleSlice: StateCreator<UserSaleState> = (set) => ({
  /** FILTER */
  saleStartTransactionDate: null,
  saleEndTransactionDate: null,
  saleStartDueDate: null,
  saleEndDueDate: null,
  customer: null,
  saleDate: todayYMString,
  setSaleStartTransactionDate: (param) =>
    set({ saleStartTransactionDate: param }),
  setSaleEndTransactionDate: (param) => set({ saleEndTransactionDate: param }),
  setSaleStartDueDate: (param) => set({ saleStartDueDate: param }),
  setSaleEndDueDate: (param) => set({ saleEndDueDate: param }),
  setCustomer: (param) => set({ customer: param }),
  setSaleDate: (param) => set({ saleDate: param }),
});

export default createUserSaleSlice;
