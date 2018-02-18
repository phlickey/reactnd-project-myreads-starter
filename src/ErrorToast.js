import React from 'react'
export default function ErrorToast(props){
  let {errorMessage}  = props
  return (
    <div className="error-toast">
      There was an error processing your request.
      The server reported the following error:
      <pre>
        {errorMessage}
      </pre>
    </div>
  )
}