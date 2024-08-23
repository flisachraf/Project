import React from 'react';
import { Link } from 'react-router-dom'; // Ensure this import is included
import './footer.css';

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container'>
          <div className='box logo'>
            <img className="widthlogo" src='../images/TULIB.png' alt='' />
            <p>الحدث في حينه</p>
            <i className='fa fa-envelope'></i>
            <span> tulibnews@gmail.com </span> <br />
            
            <i className='fa fa-headphones'></i>
            <span className="number">0021623050630</span><br />
            <i className='fa fa-headphones'></i>
            <span className="number">00218946986575</span>
          </div>

          <div className='box'>
            
            <Link to="/about-us" className='contact-link'>About Us</Link>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <div className='container flexSB'>
          <p>© all rights reserved</p>
          <p>
            made with <i></i> ❤ Developer garwachi.houssem@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
