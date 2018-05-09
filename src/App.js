import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import ErrorToast from './ErrorToast'
import './App.css'
class BooksApp extends React.Component {
  state={
    books: [],
    results: [],
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

  updateBooksArrayInitial = (books, book, newShelf)=>{
    return books.filter(b=>b.id!==book.id).concat({...book, shelf: newShelf, isDirty: true});
  }
  updateResultsArrayInitial = (results, book, newShelf) => {
    return results.map(b=>{
        if (b.id === book.id){
          return {...b, shelf: newShelf, isDirty: true};
        } else{
          return {...b};
        } 
      })
  }
  cleanBookArray = (books, bookToClean) => {
    return books.map(b => {
             if (b.id === bookToClean.id) return { ...b, isDirty: false }
             else return b
          })
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
        books: this.updateBooksArrayInitial(state.books, book, newShelf),
        results: this.updateResultsArrayInitial(state.results, book, newShelf)
      }
    });
    BooksAPI.update(book, newShelf)
      .then((data) => {
        //If everything was successful we just need to remove the dirty status from the book
        this.setState({
          books: this.cleanBookArray(this.state.books, book),
          results: this.cleanBookArray(this.state.results, book),
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
    BooksAPI.search(searchQuery)
      .then((results) => {
        let updatedResults = results.map((result)=>{
          let updatedResult = {...result};
          for (let i = 0; i < this.state.books.length; i++){
            if (result.id === this.state.books[i].id){
              updatedResult.shelf = this.state.books[i].shelf;
              return updatedResult;
            }
          }
          return updatedResult;
        })
        this.setState({
          results: updatedResults
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
        {(this.state.error && <ErrorToast errorMessage={this.state.errorMessage}/>)}
      </div>
    )
  }
}

export default BooksApp
