import React from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name}:  {person.number}</li>
  )
}

const People = ({ people }) => {

  return(
    <div>
      <h2>Numbers</h2>
      <ul>
        {people.map((person) =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default People
