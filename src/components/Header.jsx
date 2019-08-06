import React from 'react'

import logo from '../assets/images/logo.svg'

function Header() {
  return (
    <header id="header" className="alt">
      <span className="logo" role="img">
        <img src={logo} alt="M" />
      </span>
      <h1>Mariana Martins Menezes</h1>
      <p>Frontend Developer</p>
    </header>
  )
}

export default Header
