import { create } from "zustand";

import createUserContactSlice, {
  type UserContactState,
} from "./slices/user/contact.slice";

import createUserPurchaseSlice, {
  type UserPurchaseState,
} from "./slices/user/purchase.slice";

import createUserGeneralJournalSlice, {
  type UserGeneralJournalState,
} from "./slices/user/general-journal.slice";

type BoundSliceTypes = { default: null } & UserContactState &
  UserPurchaseState &
  UserGeneralJournalState;

const useUserStore = create<BoundSliceTypes>()((...setter) => ({
  default: null,
  ...createUserContactSlice(...setter),
  ...createUserPurchaseSlice(...setter),
  ...createUserGeneralJournalSlice(...setter),
}));

export default useUserStore;
