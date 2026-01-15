import { create } from "zustand";
import createUserContactSlice, {
  type UserContactState,
} from "./slices/user/contact.slice";

type BoundSliceTypes = { default: null } & UserContactState;

const useUserStore = create<BoundSliceTypes>()((...setter) => ({
  default: null,
  ...createUserContactSlice(...setter),
}));

export default useUserStore;
