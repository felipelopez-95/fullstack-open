import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './components/services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const exists = persons.some(persons => {
      return persons.name === personObject.name
    })

    if (exists) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === personObject.name)
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessageType('success')
            setMessage(
              `Modified ${returnedPerson.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessageType('error')
            setMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setPersons(persons.filter(n => n.id !== person.id))
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessageType('success')
          setMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const toogleDeleteOf = (id) => {
    const person = persons.find(n => n.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const searchPerson = (event) => {
    setFilter(event.target.value)
  }

  const personToShow = persons.filter(person => {
    const personsToLower = person.name.toLowerCase()
    const filterToLower = filter.toLowerCase()

    return personsToLower.includes(filterToLower)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={messageType} />
      <div>
         <Filter onChange={searchPerson} />
      </div>
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        <Persons
          personToShow={personToShow}
          toogleDeleteOf={toogleDeleteOf}
        />
      </ul>
    </div>
  )
}

export default App