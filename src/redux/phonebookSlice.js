import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ======= Slice

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: {
      items: [],
      filter: '',
    },
  },
  reducers: {
    addContact(state, action) {
      const { name, number } = action.payload;
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      state.contacts.items.push(contact);
    },
    deleteContact(state, action) {
      state.contacts.items = state.contacts.items.filter(
        ({ id }) => id !== action.payload
      );
    },
    changeFilter(state, action) {
      state.contacts.filter = action.payload;
    },
  },
});

const getContacts = state => state.phonebook.contacts.items;
const getFilter = state => state.phonebook.contacts.filter;
const { addContact, deleteContact, changeFilter } = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;

// ======= Custom Hook

export const usePhonebook = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const handleAddContact = (name, number) => dispatch(addContact(name, number));
  const handleDeleteContact = id => dispatch(deleteContact(id));
  const handleChangeFilter = e => dispatch(changeFilter(e.currentTarget.value));
  return {
    contacts,
    filter,
    addContact: handleAddContact,
    deleteContact: handleDeleteContact,
    changeFilter: handleChangeFilter,
  };
};

// ======= Persist
const persistConfig = {
  key: 'phonebook',
  storage,
};

export const persistedReducer = persistReducer(persistConfig, phonebookReducer);
