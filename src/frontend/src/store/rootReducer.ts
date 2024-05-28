import { combineReducers } from "@reduxjs/toolkit";
import allowanceSlice from "./allowances/allowance.slice";
import assetsSlice from "./assets/assets.slice";
import authSlice from "./auth/auth.slice";
import contactsSlice from "./contacts/contacts.slice";
import transactionsSlice from "./transactions/transactions.slice";

export const rootReducer = combineReducers({
    allowanceSlice,
    assetsSlice,
    authSlice,
    contactsSlice,
    transactionsSlice,
})