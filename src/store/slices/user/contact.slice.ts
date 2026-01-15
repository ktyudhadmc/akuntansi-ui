import type { StateCreator } from "zustand";

export declare interface UserContactState {
  activeTabContact: string;
  setActiveTabContact: (
    activeTabContact: "supplier" | "customer" | "karyawan"
  ) => void;
}

const createUserContactSlice: StateCreator<UserContactState> = (set) => ({
  activeTabContact: "supplier",
  setActiveTabContact: (param) => set({ activeTabContact: param }),
});

export default createUserContactSlice;
