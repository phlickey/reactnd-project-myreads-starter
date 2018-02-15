import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import Header from './Header'
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
    handleBookShelfChange = (book, newShelf)=>{
        book.shelf = newShelf
        let bookExists = false
        this.setState((state)=>{
            state.books.map((b)=>{
               if (b.id===book.id){
                   b.shelf = book.shelf
                   b.isDirty = true
                   bookExists
               }
               if (!bookExists){
                   state.books.push(book)
               }
            })
        BooksAPI.update(book, newShelf)
            .then(()=>{
                this.setState((state)=>{
                    state.books.map((b)=>b.isDirty=false)
                    return state
                })
            })
        return state
        })
    }
    searchBooks = (searchQuery)=>{
        this.setState({searchQuery})
        BooksAPI.search(searchQuery)
            .then((results)=>{
            this.setState({results})
        })
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
                                <input type="text" placeholder="Search by title or author" value={this.state.searchQuery} onChange={(e)=>{this.searchBooks(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {this.state.results.length>0 && (
                                    <Bookshelf name="Results" books={this.state.results} handleBookShelfChange={this.handleBookShelfChange}></Bookshelf>
                                )}
                            </ol>
                        </div>
                   </div>
                )}/>
                <Route exact path="/" render={()=>(
                  <div className="list-books">
                    <Header title={"My Reads"} />
                    <div className="list-books-content">
                      <div>
                        <Bookshelf name="Currently Reading" books={current} handleBookShelfChange={this.handleBookShelfChange}></Bookshelf>
                        <Bookshelf name="Want to Read" books={want} handleBookShelfChange={this.handleBookShelfChange}></Bookshelf>
                        <Bookshelf name="Read" books={read} handleBookShelfChange={this.handleBookShelfChange}></Bookshelf>
                      </div>
                    </div>
                    <div className="open-search">
                      <Link to="/search">Add a book</Link>
                    </div>
                  </div>
                )} />

            </div>
        )
    }
}

export default BooksApp
