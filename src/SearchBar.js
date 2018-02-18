import React from 'react'
import {Link} from 'react-router-dom'

export default function SearchBar(props){
  let {searchQuery, searchBooks} = props
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
              searchBooks(e.target.value)
            }
          }
        /> 
      </div> 
    </div> 
  )
}