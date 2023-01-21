import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './logo';

function Navbar() {
  let { pathname } = useLocation();
  pathname = pathname.slice(1, pathname.length)
  const pages = pathname.split("/")

  return (
    <div>
      <nav>
        <Link to="/" className="none"><Logo pathname={pathname} /></Link>
        {pathname && pages.map((x, i) => {
          let item = x.split("%20").join(" ")
          return <div className='history' key={i} >
            <svg className="back-arrow" width="49" height="24" viewBox="0 0 49 24" fill="none">
              <path
                d="M48.0607 13.0607C48.6464 12.4749 48.6464 11.5251 48.0607 10.9393L38.5147 1.3934C37.9289 0.807611 36.9792 0.807611 36.3934 1.3934C35.8076 1.97919 35.8076 2.92893 36.3934 3.51472L44.8787 12L36.3934 20.4853C35.8076 21.0711 35.8076 22.0208 36.3934 22.6066C36.9792 23.1924 37.9289 23.1924 38.5147 22.6066L48.0607 13.0607ZM0 13.5H47V10.5H0V13.5Z"
                fill="white" />
            </svg>
            <Link to={pages.length > 0 && pages[pages.length - 1].split("%20").join(" ") === item ? pages.join("/") : item}
              className={pages[pages.length - 1].split("%20").join(" ") === item ? "active none" : "none"}>
              {item.toUpperCase()}</Link>
          </div>
        })
        }

      </nav>
      <img className="bk image" src="/images/PVHOMEBG.png" alt="" />
      <div className="bk cover"></div>
    </div>
  )
}

export default Navbar
