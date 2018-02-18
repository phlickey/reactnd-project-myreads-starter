import React from 'react'
import {Link} from 'react-router-dom'

export default function SearchBar(props){
  let {searchQuery, handleSearchBooks} = props
  return(
    <div className="search-books-bar" >
      <Link className="close-search" to="/" >Close</Link>
      <div className="search-books-input-wrapper" > 
        <input 
          type="text"
          placeholder="Search by title or author"
          value={
            searchQuery
          }
          onChange={
            (e) => {
              handleSearchBooks(e.target.value)
            }
          }
        /> 
      </div> 
    </div> 
  )
}