import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import Header from './Header'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books : [],
        results: [],
        searchQuery: ''
    }

    componentWillMount() {
        BooksAPI.getAll().then(books=>{
            let cleanBooks = books.map(book=>{
                let cleanBook = book
                cleanBook.isDirty = false
                return cleanBook
            })
            this.setState({books: cleanBooks})
        });
    }


  handleBookShelfChange=(book, newShelf) => {
    /** We optimistically render the book on the target
    *   and signal to the user in the UI that the update is
    *   yet to be confirmed. Then once we get an api
    *   response, we confirm that our change is reflected
    *   on the server. Once this is done, we update the UI
    *   and allow the user to edit the book again.
    */
    BooksAPI.update(book, newShelf)
      .then((data) => {
        this.setState((state) => {
          let cleanBooks=state.books.map((b) => {
            let cleanBook=b
            if (typeof data[b.shelf]!=="undefined"){
              cleanBook.isDirty = !(data[b.shelf].filter((id) => (id === b.id)).length === 1)
            }
            return cleanBook
          })
          let newState=state;
          newState.books=cleanBooks;
          return newState
        })
    }
    
    
    searchBooks = (searchQuery)=>{
        this.setState({searchQuery})
        BooksAPI.search(searchQuery)
            .then((results)=>{
            this.setState({results})
        })
      })
  }


  render() {
    let current=this.state.books.filter(book => (book.shelf === "currentlyReading"))
    let want=this.state.books.filter(book => (book.shelf === "wantToRead"))
    let read=this.state.books.filter(book => (book.shelf === "read"))
    return ( 
      <div>
        <Route exact path="/search"
          render={
            () => (
              <div className="search-books" >
               <SearchBar
                 searchQuery={this.state.searchQuery}
                 searchBooks={this.searchBooks}
               />
               <SearchResults 
                 results={this.state.results} 
                 handleBookShelfChange={this.handleBookShelfChange}    
               />
              </div>
          )
        }/> 
        <Route exact path="/"
          render={
            () => (
              <div className="list-books" >
                <Header title={"My Reads"}/>
                <div className="list-books-content" >
                  <Bookshelf name="Currently Reading" books={current} handleBookShelfChange={this.handleBookShelfChange}/>
                  <Bookshelf name="Want to Read" books={want} handleBookShelfChange={this.handleBookShelfChange} /> 
                  <Bookshelf name="Read" books={read} handleBookShelfChange={this.handleBookShelfChange} /> 
                </div>
                <div className="open-search" >
                  <Link to="/search" > Add a book </Link> 
                </div> 
              </div>
            )
          }
        />
      </div>
    )
  }
}

export default BooksApp
