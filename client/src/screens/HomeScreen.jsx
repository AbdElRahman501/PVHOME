import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/logo'

function HomeScreen() {
  return (
    <section id="home">
        <div className="center bk">
            <div className="content ">
                <p> <Logo />
                    , Feel free from bills, let us help you save money
                </p>
                <Link to="/systems" className="none"> <button className="btn primary center">Start Design</button></Link>
            </div>
        </div>

    </section>
  )
}

export default HomeScreen
