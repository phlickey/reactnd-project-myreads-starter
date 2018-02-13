import React, {Component} from 'react'
import Book from './Book'
const Bookshelf = (props) => {
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{props.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.map((book)=>(
                    <Book key={book.id} thumbnail={book.imageLinks.thumbnail} authors={book.authors} title={book.title} subtitle={book.subtitle} shelf={book.shelf} />
                  ))}
            </ol>
          </div>
        </div>
    )
}
export default Bookshelf