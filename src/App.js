import React from 'react'
import {Route,Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'
class BooksApp extends React.Component {
  state={
    books: [],
    results: [],
    searchQuery: ''
  }


  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let cleanBooks=books.map(book => {
        let cleanBook=book
        cleanBook.isDirty=false
        return cleanBook
      })
      this.setState({
        books: cleanBooks
      })
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
      })
    book.shelf=newShelf
    let bookExists=false
    this.setState((state) => {
      let newState={}
      newState.books=state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf=book.shelf
          b.isDirty=true
          bookExists=true
        }
        return b
      })
      if (!bookExists) {
        newState.books.push(book)
      }
      return newState
    })
  }


  handleSearchBooks=(searchQuery) => {
    this.setState({
      searchQuery
    })
    BooksAPI.search(searchQuery)
      .then((results) => {
        this.setState({
          results
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
              <SearchBooks 
                searchQuery={this.state.searchQuery} 
                handleSearchBooks={this.handleSearchBooks} 
                results={this.state.results} 
                handleBookShelfChange={this.handleBookShelfChange} 
              />
              )
            }
        /> 
        <Route exact path="/"
          render={
            () => (
              <ListBooks 
                current={current} 
                want={want} 
                read={read} 
                handleBookShelfChange={this.handleBookShelfChange} 
              />
            )
          }
        />
      </div>
    )
  }
}

export default BooksApp
