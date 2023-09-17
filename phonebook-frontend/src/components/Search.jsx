import React from 'react'

const Search = ({ handleFilter }) => {
  return (
    <div>
        <form>
            <div>
                Search: <input onChange={handleFilter}/>
            </div>
        </form>
    </div>
  )
}

export default Search