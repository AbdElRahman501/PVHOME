import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  let { pathname } = useLocation();
  pathname = pathname.slice(1, pathname.length  )
  let pages = ["systems", "dataEntry"]
  pages = pages.includes(pathname)&&pages.slice(0,pages.indexOf(pathname)+1)
 
  


  return (
    <div>
      <nav>
        <Link to="/" className="logo none">PVHOME</Link>
        {pathname&&pages.includes(pathname)&&pages.indexOf(pathname)>=0 ? pages.map((x , i) => {
          return <div className='history' key={i} >
            <svg className="back-arrow" width="49" height="24" viewBox="0 0 49 24" fill="none">
              <path
                d="M48.0607 13.0607C48.6464 12.4749 48.6464 11.5251 48.0607 10.9393L38.5147 1.3934C37.9289 0.807611 36.9792 0.807611 36.3934 1.3934C35.8076 1.97919 35.8076 2.92893 36.3934 3.51472L44.8787 12L36.3934 20.4853C35.8076 21.0711 35.8076 22.0208 36.3934 22.6066C36.9792 23.1924 37.9289 23.1924 38.5147 22.6066L48.0607 13.0607ZM0 13.5H47V10.5H0V13.5Z"
                fill="white" />
            </svg>
            <Link to={x} className="none">{x}</Link>
          </div>
        })
          : ""}

      </nav>
      <img className="bk image" src="images/PVHOMEBG.png" alt="" />
      <div className="bk cover"></div>
    </div>
  )
}

export default Navbar
