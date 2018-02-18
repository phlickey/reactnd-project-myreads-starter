import React from 'react'
import Bookshelf from './Bookshelf'

export default function SearchResults(props){
  let {results, handleBookShelfChange} = props
  return(
    <div className="search-books-results" >
      <ol className="books-grid"> 
        {
          (results && results.length > 0) && ( 
            <Bookshelf 
              name={`Your search returned ${results.length} matches`}
              books={
                results
              }
              handleBookShelfChange={
                handleBookShelfChange
              } 
            />
          )
        } 
      </ol> 
    </div> 
  )
}