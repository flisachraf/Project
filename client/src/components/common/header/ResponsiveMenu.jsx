import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { FaHome, FaInfoCircle, FaUserCircle, FaTimes } from 'react-icons/fa'; // Added FaTimes for close icon
import { CiLogout, CiLogin } from 'react-icons/ci';
import { useAuth } from '../../AuthContext';
import { useTranslation } from 'react-i18next';

const ResponsiveMenu = ({ showMenu, setShowMenu }) => {
  const { logout, user } = useAuth();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const imageSrc = user?.image
    ? `http://localhost:8000/${user.image.replace("\\", "/")}`
    : 'http://localhost:8000/default-image.png';

  // Handle click outside to close the menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Determine the positioning class based on language
  const positionClass = i18n.language === 'ar' ? 'right-0' : 'left-0';

  return (
    <div
      className={`fixed top-0 ${positionClass} w-64 h-full bg-[#334155] text-white transform transition-transform duration-300 z-20 ${
        showMenu ? 'translate-x-0' : i18n.language === 'ar' ? 'translate-x-full' : '-translate-x-full'
      }`}
      ref={menuRef} // Add ref for detecting outside clicks
      dir={i18n.language==="ar"?'rtl':'ltr'}
    >
      <div className="flex flex-col h-full p-6">
        {/* Close icon */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold"></h1>
          <button
            aria-label="Close menu"
            onClick={() => setShowMenu(false)}
            className="text-2xl text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* User Information */}
        {token && (
          <div className="flex flex-col items-center mb-6">
            <Link to="/Dashboard">
              <div className="rounded-full overflow-hidden border-4 border-white w-10 h-10 cursor-pointer">
                <img src={imageSrc} alt="Profile Preview" className="w-full h-full" />
              </div>
            </Link>
            <h1 className="text-lg mt-2">Hello {user?.role}</h1>
            <h2 className="text-sm text-gray-300">{user?.username}</h2>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-grow">
          <ul className="space-y-4">
            <li>
              <Link to="/" className="flex items-center text-lg font-medium hover:text-blue-500">
                 {i18n.t('Home')}
              </Link>
            </li>
            <li>
              <Link to="/category/Politics" className="flex items-center text-lg font-medium hover:text-blue-500">
                {i18n.t('Politics')}
              </Link>
            </li>
            <li>
              <Link to="/category/Economy" className="flex items-center text-lg font-medium hover:text-blue-500">
                {i18n.t('Economy')}
              </Link>
            </li>
            <li>
              <Link to="/category/Security" className="flex items-center text-lg font-medium hover:text-blue-500">
                {i18n.t('Security')}
              </Link>
            </li>
            <li>
              <Link to="/category/Borders" className="flex items-center text-lg font-medium hover:text-blue-500">
                {i18n.t('Borders')}
              </Link>
            </li>
            <li>
              <Link to="/category/Sports" className="flex items-center text-lg font-medium hover:text-blue-500">
                {i18n.t('Sports')}
              </Link>
            </li>
            <li>
              <Link to="/category/Infographics" className="flex items-center text-lg font-medium hover:text-blue-500">
                {i18n.t('Infographics')}
              </Link>
            </li>
            <li>
              <Link to="/category/Videographics" className="flex items-center text-lg font-medium hover:text-blue-500">
                {i18n.t('Videographics')}
              </Link>
            </li>
            <li
              className="relative"
              ref={dropdownRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <button className="flex items-center text-lg font-medium hover:text-blue-500">
                {i18n.t('Tulib')}
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-48 bg-[#334155] shadow-lg mt-2 rounded-lg">
                  <Link
                    to="/category/Tunisian In Libya"
                    className="block py-2 px-4 text-white hover:bg-blue-900 text-center"
                  >
                    {i18n.t('TunisiansInLibya')}
                  </Link>
                  <Link
                    to="/category/Libyan In Tunisia"
                    className="block py-2 px-4 text-white hover:bg-blue-900 text-center"
                  >
                    {i18n.t('LibyansInTunisia')}
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Footer / Authentication Buttons */}
        <div className="mt-6">
          {token && (
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center gap-4 mb-4 text-lg hover:text-blue-500"
            >
              <CiLogout className="text-xl" />
              {i18n.t('Logout')}
            </button>
          )}
          <h1 className="text-center text-sm mt-auto">
            Made with ❤ by <a href="" className="text-blue-500">Dabbek Ramzi</a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
