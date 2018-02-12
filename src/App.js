import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books : []
    }
    componentWillMount = () => {
        BooksAPI.getAll().then(books=>{
            console.log(books);
            this.setState({books});
        });
    }
  render() {
      let current = this.state.books.filter(book=>(book.shelf==="currentlyReading"))
      let want = this.state.books.filter(book=>(book.shelf==="wantToRead"))
      let read = this.state.books.filter(book=>(book.shelf==="read"))

    return (
        <div>
               <Route exact path="/search" render={()=>(
                    <div className="search-books">
                        <div className="search-books-bar">
                          <Link className="close-search" to="/">Close</Link>
                          <div className="search-books-input-wrapper">
                            {/*
                              NOTES: The search from BooksAPI is limited to a particular set of search terms.
                              You can find these search terms here:
                              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                              you don't find a specific author or title. Every search is limited by search terms.
                            */}
                            <input type="text" placeholder="Search by title or author"/>

                          </div>
                        </div>
                        <div className="search-books-results">
                          <ol className="books-grid"></ol>
                        </div>
                   </div>
                )}/>
                <Route exact path="/" render={()=>(
                
                <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {current.map((book)=>(
                            <Book key={book.id} thumbnail={book.imageLinks.thumbnail} authors={book.authors} title={book.title} subtitle={book.subtitle} />
                          ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {want.map((book)=>(
                            <Book key={book.id} thumbnail={book.imageLinks.thumbnail} authors={book.authors} title={book.title} subtitle={book.subtitle} />
                          ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {read.map((book)=>(
                            <Book key={book.id} thumbnail={book.imageLinks.thumbnail} authors={book.authors} title={book.title} subtitle={book.subtitle} />
                          ))
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
                )}/>
              
        </div>
    )
  }
}

export default BooksApp
