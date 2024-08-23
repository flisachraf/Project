import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ isOpen, onClose, language }) => {
  const sidebarRef = useRef(null);
  const { i18n } = useTranslation();

  // Close sidebar when clicking outside
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-64 h-full bg-[#334155] transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50 shadow-lg lg:hidden`}
    >
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={onClose}
      >
        <i className="fa fa-times"></i>
      </button>
      <nav className="mt-16">
        <ul className="space-y-4">
          <li><Link to="/" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Home')}</Link></li>
          <li><Link to="/Politics" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Politics')}</Link></li>
          <li><Link to="/Economy" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Economy')}</Link></li>
          <li><Link to="/Security" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Security')}</Link></li>
          <li><Link to="/Borders" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Borders')}</Link></li>
          <li>
            <button className="block py-2 px-4 text-white hover:text-blue-500" onClick={() => { /* Handle dropdown toggle */ }}>
              {i18n.t('Tulib')}
            </button>
            {/* Dropdown items */}
          </li>
          <li><Link to="/Sports" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Sports')}</Link></li>
          <li><Link to="/Infographics" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Infographics')}</Link></li>
          <li><Link to="/Videographics" className="block py-2 px-4 text-white hover:text-blue-500">{i18n.t('Videographics')}</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
