import { create } from "zustand";

import createUserContactSlice, {
  type UserContactState,
} from "./slices/user/contact.slice";

import createUserPurchaseSlice, {
  type UserPurchaseState,
} from "./slices/user/purchase.slice";

type BoundSliceTypes = { default: null } & UserContactState & UserPurchaseState;

const useUserStore = create<BoundSliceTypes>()((...setter) => ({
  default: null,
  ...createUserContactSlice(...setter),
  ...createUserPurchaseSlice(...setter),
}));

export default useUserStore;
