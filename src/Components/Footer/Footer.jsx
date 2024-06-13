import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'

function Footer() {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="footer-content">
        <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document</p>
        <div className="icons">
          <i class="fa-brands fa-square-instagram"></i>
          <i class="fa-brands fa-square-x-twitter"></i>
          <i class="fa-brands fa-square-youtube"></i>
          <i class="fa-solid fa-square-envelope"></i>
        </div>
        <div className="support">
          <p>Support: moviesnow@gmail.com</p>
          <p>2024 Movies now © All rights reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
