import React from 'react'
import { Link} from 'react-router-dom'
import "../styles/pageNotFound.css"

function PageNotFound() {
  return (
    <div className='center bk'>
      <div>
      <h1 className='content center'>404</h1>
      <h5 className='content center'>Look like you are lost</h5>
      <p className='content center'>Hold my <Link className='none' to="/">&#9995;</Link> to take you home </p>
    </div>  
    </div>
    
  )
}

export default PageNotFound
