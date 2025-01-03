import { useState, useEffect } from 'react'
import personsHttpClient from './services/personsHttpClient';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Message from './components/Message';
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    personsHttpClient
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {setNewName(event.target.value);}
  const handleNumberChange = (event) => {setNewNumber(event.target.value);}
  const handleFilterChange = (event) => {setFilter(event.target.value);}
  const handleMessage = (message, isError) => {
    setMessage(message);
    setError(isError);
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const existPerson = persons.find((person) => person.name === newName);
    const newPerson = {name: newName, number: newNumber};

    if(existPerson && window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      personsHttpClient
      .update(existPerson.id, newPerson)
      .then((updatedPerson) => {
        setPersons(persons.map((p) => (p.id !== existPerson.id ? p : updatedPerson)));
        setNewName('');
        setNewNumber('');
        handleMessage(`Updated ${newName} phone number`);
      })
      .catch((error => {
        if (error.response.data.error) {
          handleMessage(error.response.data.error, true);
        } else {
          handleMessage(
            `Information of ${newName} has already been removed from server`,
            true
          )
        }
      }))
    } else {
      personsHttpClient
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('');
        setNewNumber('');
        handleMessage(`Added ${newName}`, false)
      })
      .catch(error => {
        handleMessage(error.response.data.error, true);
    });
    }

  }

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsHttpClient
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };


  const personsToShow =  filter.length > 0 ? persons.filter((person) =>person.name.toLowerCase().includes(filter.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} isError={error} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App