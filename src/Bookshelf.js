import React from 'react'
import Book from './Book'
const Bookshelf = (props) => {
    console.log(props)
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{props.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.map((book)=>(
                    <Book key={book.id} book={book} handleBookShelfChange={props.handleBookShelfChange}/>
                  ))}
            </ol>
          </div>
        </div>
    )
}
export default Bookshelf