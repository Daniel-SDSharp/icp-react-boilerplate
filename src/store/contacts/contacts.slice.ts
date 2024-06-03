import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Contact } from '../../types/contacts';
import { ErrorMessage, Status } from '../../types/transactions';

interface ContactsState {
  contacts: Contact[]
  status: Status,
  error: ErrorMessage
}

const initialState: ContactsState = {
  contacts: [],
  status: "IDLE",
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<Contact[]>) {
      state.contacts = action.payload;
    },
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    updateContact(state, action: PayloadAction<Contact>) {
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
    setEerror(state, action: PayloadAction<string>) {
      state.error = action.payload
    }
  }
})


export const { setContacts, addContact, updateContact, deleteContact, clearContacts } =
  contactsSlice.actions;

export default contactsSlice.reducer