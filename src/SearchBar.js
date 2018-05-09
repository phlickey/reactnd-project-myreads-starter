import React from 'react'
import {Link} from 'react-router-dom'
import { Debounce } from 'react-throttle'

export default function SearchBar(props){
  let {handleSearchBooks} = props
  return(
    <div className="search-books-bar" >
      <Link className="close-search" to="/" >Close</Link>
      <div className="search-books-input-wrapper" >
        <Debounce time="350" handler="onChange">
          <input 
            type="text"
            placeholder="Search by title or author"
            onChange={
              (e) => {
                handleSearchBooks(e.target.value)
              }
            }
          />
        </Debounce> 
      </div> 
    </div> 
  )
}