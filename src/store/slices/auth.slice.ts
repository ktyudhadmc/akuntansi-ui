import type { User } from "@services/auth/interfaces/user.type";
import type { StateCreator } from "zustand";

export declare interface AuthState {
  phone: string;
  setPhone: (param: string) => void;
  role: "admin" | "company" | "user";
  setRole: (role: "admin" | "company" | "user") => void;
  me?: User;
  setMe: (user: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const createAuthSlice: StateCreator<AuthState> = (set) => ({
  phone: "",
  role: "user",
  isLoggedIn: false,
  me: undefined,
  setPhone: (param) => set({ phone: param }),
  setRole: (role) => set({ role }),
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setMe: (user) => set({ me: user }),
});

export default createAuthSlice;
