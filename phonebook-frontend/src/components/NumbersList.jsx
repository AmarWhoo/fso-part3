import React from 'react'

const NumbersList = ({ persons, handleRemove }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map( person => 
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleRemove(person.id)}>
              delete
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default NumbersList