import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Contact } from '../../types/contacts';
import { ErrorMessage, Status } from '../../types/transactions';
import { REDUCER_STATUS } from '../../middleware/const';
import { ContactView } from 'hpl-middleware-wallet/src/core/types/contact.types';

interface ContactsState {
  contacts: ContactView[]
  status: Status,
  error: ErrorMessage
}

const initialState: ContactsState = {
  contacts: [],
  status: REDUCER_STATUS.IDLE,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<ContactView[]>) {
      state.contacts = action.payload;
    },
    addContact(state, action: PayloadAction<ContactView>) {
      state.contacts.push(action.payload);
    },
    updateContact(state, action: PayloadAction<ContactView>) {
      const updatedContact = action.payload;
      const index = state.contacts.findIndex(contact => contact.principal === updatedContact.principal);
      if (index !== -1) {
        state.contacts[index] = updatedContact;
      }
    },
    deleteContact(state, action: PayloadAction<string>) {
      state.contacts = state.contacts.filter(contact => contact.principal !== action.payload);
    },
    clearContacts(state) {
      state.contacts = [];
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    setLoading(state) {
      state.status = REDUCER_STATUS.LOADING
    },
  }
})


export const { setContacts, addContact, updateContact, deleteContact, clearContacts, setError, setLoading } =
  contactsSlice.actions;

export default contactsSlice.reducer