import React from 'react'

const Person = ({ person, destroyPerson }) => {
  return (
    <li>{person.name}:  {person.number} <button onClick={destroyPerson}>delete</button></li>
  )
}

const People = ({ people, destroyPerson }) => {

  return(
    <div>
      <h2>Numbers</h2>
      <ul>
        {people.map((person) =>
          <Person key={person.name} person={person} destroyPerson={destroyPerson(person)} />
        )}
      </ul>
    </div>
  )
}

export default People
