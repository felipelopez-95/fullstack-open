import { useState,useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hooks = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfielld')
        setPersons(response.data)
        
      })
  }

  useEffect(hooks, [])
  console.log('render', persons.length, 'persons')
  

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
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const searchPerson = (event) => {
    console.log(event.target.value)
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
      <div>
         <Filter onChange={searchPerson} />
      </div>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        <Persons personToShow={personToShow} />
      </ul>
    </div>
  )
}

export default App