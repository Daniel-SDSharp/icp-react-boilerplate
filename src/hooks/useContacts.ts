// hooks/useContacts.js
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';
import { setContacts, addContact, updateContact, deleteContact, clearContacts, setLoading, setError } from '../store/contacts/contacts.slice';
import { getContactsHandler, addContactHandler, editContactHandler, removeContactHandler, removeAssetFromContactHandler, addAssetToContactHandler, removeSubAccountFromContactHandler } from '../middleware/contacts/contacts.handler';
import { Contact } from '../types/contacts';
import { ContactView } from 'hpl-middleware-wallet/src/core/types/contact.types';

export const useContacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const status = useSelector((state: RootState) => state.contacts.status);
  const error = useSelector((state: RootState) => state.contacts.error);

  const middlewareDependencies = useSelector((state: RootState) => state.middleware.dependencies)

  const getContacts = async () => {
    try {
      if (middlewareDependencies) {
        dispatch(setLoading());
        const contacts = await getContactsHandler(middlewareDependencies);
        if (contacts)
          dispatch(setContacts(contacts));
      }
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  return { contacts, status, error };
};
