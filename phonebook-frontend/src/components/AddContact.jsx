import React from 'react'

const AddContact = ({ newName, newNumber, handleName, handleNumber, addPerson }) => {
  return (
    <div>
        <h2>Add Contact</h2>
        <form>
            <div>
                name: <input value={newName} onChange={handleName}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumber}/>
            </div>
            <div>
                <button type="submit" onClick={addPerson}>add</button>
            </div>
        </form>
    </div>
  )
}

export default AddContact