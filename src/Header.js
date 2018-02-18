import React from 'react'
export default function Header(props){
  let title = props.title
  return(
    <div className="list-books-title">
      <h1>{title}</h1>
    </div>
  )
}