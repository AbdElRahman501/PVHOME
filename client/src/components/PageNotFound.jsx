import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import "../styles/pageNotFound.css"

function PageNotFound() {
  let navigate = useNavigate();

 const timer = () => setTimeout(() => {
  navigate("/")
  }, 500);
  return (
    <div className='center bk'>
      <div>
      <h1 className='content center'>404</h1>
      <h5 className='content center'>Look like you are lost</h5>
      <p className='content center'>Hold my <Link className='none' to="#" onClick={() => timer()}>&#9995;</Link> to take you home </p>
    </div>  
    </div>
    
  )
}

export default PageNotFound
