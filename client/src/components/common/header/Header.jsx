import React, { useState, useRef, useEffect } from 'react';
import Head from './Head';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { useTranslation } from 'react-i18next';
import ProfileDropdown from './ProfileDropdown';
import ResponsiveMenu from './ResponsiveMenu';

const Header = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();
  const token = localStorage.getItem('token');
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const imageSrc = user?.image ? `http://srv586727.hstgr.cloud:8000/${user.image.replace("\\", "/")}` : 'http://srv586727.hstgr.cloud:8000/default-image.png';

  // Function to handle language switch
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Handle click outside dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Attach event listener for click outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Render Head component only on large screens */}
      <div className=" container">
        <Head />
      </div>

      <header className=" container inset-0 flex items-center gap-5 p-4 rounded-lg shadow-md bg-[#B80000]  ">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center h-10">
          <button
            aria-label="Toggle navigation menu"
            className="lg:hidden text-2xl text-white focus:outline-none"
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          >
            {isNavbarOpen ? (
              <i className="fa fa-times"></i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>

          {/* Navbar items */}
          <ul
            className={`fixed hidden  w-full bg-[#334155] shadow-md lg:static lg:flex lg:items-center lg:space-x-6 lg:bg-transparent lg:shadow-none lg:top-0`}
            style={isNavbarOpen ? { height: 'calc(100vh - 64px)', overflowY: 'auto' } : {}}
          >
            <li><Link to="/" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Home')}</Link></li>
            <li><Link to="/category/Politics" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Politics')}</Link></li>
            <li><Link to="/category/Economy" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Economy')}</Link></li>
            <li><Link to="/category/Security" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Security')}</Link></li>
            <li><Link to="/category/Borders" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Borders')}</Link></li>
            <li
              className="relative"
              ref={dropdownRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <button className="block py-2 px-4 text-white hover:text-blue-500">
                {i18n.t('Tulib')}
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-48 bg-[#334155] shadow-lg mt-2 rounded-lg">
                  <Link to="/category/Tunisian In Libya" className="block py-2 px-4 text-white hover:bg-blue-900 text-center">
                    {i18n.t('TunisiansInLibya')}
                  </Link>
                  <Link to="/category/Libyan In Tunisia" className="block py-2 px-4 text-white hover:bg-blue-900 text-center">
                    {i18n.t('LibyansInTunisia')}
                  </Link>
                </div>
              )}
            </li>
            <li><Link to="/category/Sport" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Sports')}</Link></li>
            <li><Link to="/category/Infographs" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Infographics')}</Link></li>
            <li><Link to="/category/VideoGraphs" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Videographics')}</Link></li>
            
            <ProfileDropdown token={token} imageSrc={imageSrc} user={user} logout={logout} />
          </ul>

          {/* Auth and language controls */}
          <div className="flex items-center space-x-4">
            <div className="flex gap-2 ">
              <button
                onClick={() => handleLanguageChange('ar')}
                className={`py-2 px-2 rounded-lg ${i18n.language === 'ar' ? 'bg-black' : 'bg-black'} text-white`}
              >
                العربية
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`py-2 px-2 rounded-lg ${i18n.language === 'en' ? 'bg-black' : 'bg-black'} text-white`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </header>
      <ResponsiveMenu showMenu={isNavbarOpen} setShowMenu={setIsNavbarOpen} />
      
    </>
  );
};

export default Header;
