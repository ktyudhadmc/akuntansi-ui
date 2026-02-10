import { create } from "zustand";

import createUserContactSlice, {
  type UserContactState,
} from "./slices/user/contact.slice";

import createUserPurchaseSlice, {
  type UserPurchaseState,
} from "./slices/user/purchase.slice";

import createUserSaleSlice, {
  type UserSaleState,
} from "./slices/user/sale.slice";

import createUserGeneralJournalSlice, {
  type UserGeneralJournalState,
} from "./slices/user/report/general-journal.slice";

import createUserLedgerSlice, {
  type UserLedgerState,
} from "./slices/user/report/ledger.slice";

import createUserTrialBalanceSlice, {
  type UserTrialBalanceState,
} from "./slices/user/report/trial-balance.slice";

type BoundSliceTypes = { default: null } & UserContactState &
  UserPurchaseState &
  UserSaleState &
  UserGeneralJournalState &
  UserLedgerState &
  UserTrialBalanceState;

const useUserStore = create<BoundSliceTypes>()((...setter) => ({
  default: null,
  ...createUserContactSlice(...setter),
  ...createUserPurchaseSlice(...setter),
  ...createUserGeneralJournalSlice(...setter),
  ...createUserLedgerSlice(...setter),
  ...createUserSaleSlice(...setter),
  ...createUserTrialBalanceSlice(...setter),
}));

export default useUserStore;
