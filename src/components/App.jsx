import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Notification } from './Notification/Notification';
import { Container, MainTitle, SubTitle } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (
      contacts.some(
        contactItem =>
          contactItem.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      return alert(`${contact.name} is already in contacts`);
    }
    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = deleteId => {
    setContacts(contacts.filter(({ id }) => id !== deleteId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const visibleContacts = filterContacts();

  return (
    <Container>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm addContact={addContact} />
      <SubTitle>Contacts</SubTitle>
      {contacts.length > 1 && (
        <Filter filter={filter} changeFilter={changeFilter} />
      )}
      {contacts.length ? (
        <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
      ) : (
        <Notification message="List is empty" />
      )}
    </Container>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parseContacts = JSON.parse(contacts);
//     if (parseContacts) {
//       this.setState({ contacts: parseContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = (name, number) => {
//     const { contacts } = this.state;

//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     contacts.map(contactItem => {
//       if (contactItem.name === contact.name) {
//         return alert(`${contact.name} is already in contacts`);
//       }
//       return contactItem;
//     });

//     this.setState(({ contacts }) => {
//       return {
//         contacts: [contact, ...contacts],
//       };
//     });
//   };

//   deleteContact = deleteId => {
//     this.setState(({ contacts }) => {
//       return {
//         contacts: contacts.filter(({ id }) => id !== deleteId),
//       };
//     });
//   };

//   changeFilter = e => {
//     this.setState({
//       filter: e.currentTarget.value,
//     });
//   };

//   filterContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizeFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeFilter)
//     );
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const { addContact, deleteContact, filterContacts, changeFilter } = this;
//     const visibleContacts = filterContacts();
//     return (
//       <Container>
//         <MainTitle>Phonebook</MainTitle>
//         <ContactForm addContact={addContact} />

//         <SubTitle>Contacts</SubTitle>
//         {contacts.length > 1 && (
//           <Filter filter={filter} changeFilter={changeFilter} />
//         )}
//         {contacts.length ? (
//           <ContactList
//             contacts={visibleContacts}
//             deleteContact={deleteContact}
//           />
//         ) : (
//           <Notification message="List is empty" />
//         )}
//       </Container>
//     );
//   }
// }
