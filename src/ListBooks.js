import React from 'react'
import Header from './Header'
import Bookshelf from './Bookshelf'
import {Link} from 'react-router-dom'

export default function ListBooks (props){
  let {current, want, read, handleBookShelfChange} = props
  return(
    <div className="list-books" >
      <Header title={"My Reads"}/>
      <div className="list-books-content" >
        <Bookshelf name="Currently Reading" books={current} handleBookShelfChange={handleBookShelfChange}/>
        <Bookshelf name="Want to Read" books={want} handleBookShelfChange={handleBookShelfChange} /> 
        <Bookshelf name="Read" books={read} handleBookShelfChange={handleBookShelfChange} /> 
      </div>
      <div className="open-search" >
        <Link to="/search" > Add a book </Link> 
      </div> 
    </div>
  )
}