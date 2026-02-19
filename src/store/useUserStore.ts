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

import createUserCashFlowSlice, {
  type UserCashFlowState,
} from "./slices/user/report/cash-flow.slice";

import createUserProfitLossSlice, {
  type UserProfitLossState,
} from "./slices/user/report/profit-loss.slice";

type BoundSliceTypes = { default: null } & UserContactState &
  UserPurchaseState &
  UserSaleState &
  UserGeneralJournalState &
  UserLedgerState &
  UserTrialBalanceState &
  UserCashFlowState &
  UserProfitLossState;

const useUserStore = create<BoundSliceTypes>()((...setter) => ({
  default: null,
  ...createUserContactSlice(...setter),
  ...createUserPurchaseSlice(...setter),
  ...createUserGeneralJournalSlice(...setter),
  ...createUserLedgerSlice(...setter),
  ...createUserSaleSlice(...setter),
  ...createUserTrialBalanceSlice(...setter),
  ...createUserCashFlowSlice(...setter),
  ...createUserProfitLossSlice(...setter),
}));

export default useUserStore;
