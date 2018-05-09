import React from 'react'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

export default function SearchBooks (props){
  let {handleSearchBooks, results, handleBookShelfChange} = props
  return(
    <div className="search-books" >
     <SearchBar
       handleSearchBooks={handleSearchBooks}
     />
     <SearchResults 
       results={results} 
       handleBookShelfChange={handleBookShelfChange}    
     />
    </div>
  )
}