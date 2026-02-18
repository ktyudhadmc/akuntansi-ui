import type { Company } from "@services/global/company/interfaces/response.type";
import type { User } from "@services/auth/interfaces/user.type";
import type { Period } from "@services/auth/interfaces/period.type";

import type { StateCreator } from "zustand";

export declare interface AuthState {
  phone: string;
  setPhone: (param: string) => void;
  role: "admin" | "company" | "user";
  setRole: (role: "admin" | "company" | "user") => void;
  me?: User;
  setMe: (user: User) => void;

  currentPeriod?: Period | null;
  setCurrentPeriod: (period: Period | null) => void;

  openPeriods?: Period[] | null;
  setOpenPeriods: (openPeriods: Period[] | null) => void;

  currentCompany?: Company | null;
  setCurrentCompany: (company: Company | null) => void;
  currentCompanyLoading: boolean;
  setCurrentCompanyLoading: (isLoggedIn: boolean) => void;

  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;

  isSelectCompany: boolean;
  setIsSelectCompany: (isSelectCompany: boolean) => void;
}

const createAuthSlice: StateCreator<AuthState> = (set) => ({
  phone: "",
  role: "user",
  me: undefined,
  isLoggedIn: false,
  isSelectCompany: false,

  currentPeriod: null,
  openPeriods: null,

  currentCompany: null,
  currentCompanyLoading: true,

  setPhone: (param) => set({ phone: param }),
  setRole: (role) => set({ role }),
  setMe: (user) => set({ me: user }),

  setCurrentPeriod: (param) => set({ currentPeriod: param }),
  setOpenPeriods: (param) => set({ openPeriods: param }),

  setCurrentCompany: (param) => set({ currentCompany: param }),
  setCurrentCompanyLoading: (currentCompanyLoading: boolean) =>
    set({ currentCompanyLoading }),

  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setIsSelectCompany: (isSelectCompany: boolean) => set({ isSelectCompany }),
});

export default createAuthSlice;
