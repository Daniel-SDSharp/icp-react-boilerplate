import { combineReducers } from "@reduxjs/toolkit";
import allowanceSlice from "./allowances/allowance.slice";
import assetsSlice from "./assets/assets.slice";
import authSlice from "./auth/auth.slice";
import contactsSlice from "./contacts/contacts.slice";
import transactionsSlice from "./transactions/transactions.slice";
import middlewareSlice from "./middleware/middleware.slice";

export const rootReducer = combineReducers({
  contacts: contactsSlice,
  allowance: allowanceSlice,
  assets: assetsSlice,
  auth: authSlice,
  transactions: transactionsSlice,
  middleware: middlewareSlice
})