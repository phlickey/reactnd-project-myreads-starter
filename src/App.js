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
    searchQuery: '',
    error: false,
    errorMessage : ''
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
    let oldState = JSON.parse(JSON.stringify(this.state))
    this.setState((state) => {
      return {
        ...state,
        books: state.books.filter(b=>b.id!==book.id).concat(
          {...book, 
           shelf: newShelf, 
           isDirty: true})
      }
    })
    BooksAPI.update(book, newShelf)
      .then((data) => {
        //If everything was successful we just need to remove the dirty status from the book
        this.setState({
          books: this.state.books.map(b => {
             if (b.id === book.id) return { ...b, isDirty: false }
             else return b
          })
        })
      }).catch(e=>{
        console.error(`Unable to set new shelf ${e.message}`)
        this.setState({...oldState, 
                       error: true, 
                       errorMessage: e.message
                      })
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
