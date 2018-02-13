import React, {Component} from 'react'
class Book extends Component{
    render(){
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.thumbnail}")` }}></div>
                            <div className="book-shelf-changer">
                                <select onChange={e=>{console.log(e)} } value={this.props.shelf}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                    <div className="book-title">{this.props.title} <br /><small>{this.props.subtitle}</small></div>
                <div className="book-authors">{this.props.authors.join(', ')}</div>
            </div>
        </li>
    )
    }
}
export default Book