import type { Company } from "@services/global/company/interfaces/response.type";
import type { User } from "@services/auth/interfaces/user.type";
import type { StateCreator } from "zustand";

export declare interface AuthState {
  phone: string;
  setPhone: (param: string) => void;
  role: "admin" | "company" | "user";
  setRole: (role: "admin" | "company" | "user") => void;
  me?: User;
  setMe: (user: User) => void;
  currentCompany?: Company | null;
  setCurrentCompany: (company: Company | null) => void;
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
  setPhone: (param) => set({ phone: param }),
  setRole: (role) => set({ role }),
  setMe: (user) => set({ me: user }),
  setCurrentCompany: (param) => set({ currentCompany: param }),
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setIsSelectCompany: (isSelectCompany: boolean) => set({ isSelectCompany }),
});

export default createAuthSlice;
