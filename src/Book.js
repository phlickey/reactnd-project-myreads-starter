import React from 'react'

export default function Book (props){
  let {book, handleBookShelfChange} = props
  let thumbnail = book.imageLinks ? book.imageLinks.thumbnail : `https://via.placeholder.com/128x193?text=${book.title.replace(/ /,"+")}`
  return (
    <li className={book.isDirty?'dirty':'clean'}>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e)=>{handleBookShelfChange(book, e.target.value)}} value={book.shelf?book.shelf:"none"}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title} <br /><small>{book.subtitle}</small></div>
        <div className="book-authors">{book.authors&&book.authors.join(', ')}</div>
      </div>
    </li>
  )
}
