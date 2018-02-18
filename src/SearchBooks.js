import React from 'react'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

export default function SearchBooks (props){
  let {searchQuery, handleSearchBooks, results, handleBookShelfChange} = props
  return(
    <div className="search-books" >
     <SearchBar
       searchQuery={searchQuery}
       handleSearchBooks={handleSearchBooks}
     />
     <SearchResults 
       results={results} 
       handleBookShelfChange={handleBookShelfChange}    
     />
    </div>
  )
}