import React, { useEffect, useState } from 'react'
import peopleService from './services/people'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import People from './components/People'

const App = () => {
  const [ people, setPeople ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPeople(initialPeople)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const clearForm = () => {
      setNewName('')
      setNewNumber('')
    }

    if(people.some((p) => p.name === personObject.name)) {
      let existingPerson = people.filter((p) => p.name === personObject.name)[0]
      if(window.confirm(`${personObject.name} has already been added to the phonebook, replace the old number with this new one?`)) {
        peopleService
          .update(existingPerson.id, { ...existingPerson, ...personObject })
          .then(returnedPerson => {
            setPeople(people.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setSuccessMessage(`${existingPerson.name}'s number has been updated.`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            clearForm()
          })
          .catch(error => {
            setErrorMessage(`'${existingPerson.name}' was already deleted!`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPeople(people.filter(person => person.id !== existingPerson.id))
            clearForm()
          })
      } else {
        clearForm()
      }
    } else {
      peopleService
        .create(personObject)
        .then(returnedPerson => {
          setPeople(people.concat(returnedPerson))
          setSuccessMessage(`${returnedPerson.name} created!`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          clearForm()
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const destroyPerson = (person) => () => {
    if(window.confirm(`Delete ${person.name}?`)) {
      peopleService
        .destroy(person.id)
        .then(result => {
          setPeople(people.filter((personIter) => personIter.id !== person.id))
          setSuccessMessage(`${person.name} deleted!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const peopleToShow = people.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add Contact</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <People people={peopleToShow} destroyPerson={destroyPerson} />
    </div>
  )
}

export default App
