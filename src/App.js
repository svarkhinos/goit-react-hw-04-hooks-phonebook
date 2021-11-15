import './App.css';

import shortid from 'shortid';
import Section from './components/Section/Section';
import Form from './components/Form/Form';

import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import { useState, useEffect } from 'react';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? '';
  });
  const [filter, setFilter] = useState('');

  const formSubmitHandler = (name, number) => {
    const nameExist = contacts.find(contact => contact.name === name);

    if (nameExist !== undefined) {
      alert(`${name}is already in contacts`);
    } else {
      const newContact = {
        id: shortid.generate(),
        name,
        number,
      };

      setContacts(prevState => [newContact, ...prevState]);
    }
  };

  const changeFilter = event => {
    const filterValue = event.currentTarget.value;

    setFilter(filterValue);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    if (contacts !== '') {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter),
      );
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId),
    );
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = getVisibleContacts();
  return (
    <div>
      Homework-4
      <Section title="Phone-book">
        <Form onSubmit={formSubmitHandler} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />

        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </div>
  );
};

export default App;
