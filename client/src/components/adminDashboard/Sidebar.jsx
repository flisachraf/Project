import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaConciergeBell, FaRegFileVideo } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { GoSponsorTiers } from 'react-icons/go';
import { GiNewspaper } from 'react-icons/gi';
import { TbFileInfo } from 'react-icons/tb';
import { MdSubscriptions } from 'react-icons/md';
import { useAuth } from '../AuthContext';
import { TbCategory2 } from "react-icons/tb";

const Sidebar = ({ setContent, content }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const checkScreenWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setOpen(false);
    }
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  const menus = useMemo(() => [
    { name: 'Home', link: '/home', icon: FaHome, content: 0 },
    { name: 'News', roles: ['super admin', 'admin', 'editor'], icon: GiNewspaper, content: 3 },
    { name: 'Users', roles: ['super admin'], icon: FaUsers, content: 0 },
    { name: 'Sponsors', roles: ['super admin'], icon: GoSponsorTiers, content: 1 },
    { name: 'Profile', roles: ['super admin', 'admin', 'editor'], icon: ImProfile, content: 2 },
    { name: 'Subscribers', roles: ['super admin', 'admin'], icon: MdSubscriptions, content: 6 },
    { name: 'Sponsor', roles: ["sponsor"], icon: GoSponsorTiers, content: 7 },
    // { name: 'Categories', roles:["super admin"], icon: TbCategory2, content: 8 }
  ], []);

  const filteredMenus = useMemo(() => menus.filter(menu => !menu.roles || menu.roles.includes(user?.role)), [menus, user?.role]);

  const handleMenuClick = useCallback(menuContent => {
    setContent(menuContent);
  }, [setContent]);

  // Handle default image or empty image source
  const imageSrc = user?.image ? `http://localhost:8000/${user.image.replace("\\", "/")}` : 'http://localhost:8000/default-image.png';

  return (
    <div className={`bg-[#0e0e0e] min-h-screen ${open ? 'w-52' : 'w-16'} duration-500 text-gray-100 px-4 fixed top-0 h-full z-50`}>
      <div className="py-3 flex justify-between items-center">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        <div className="flex flex-col items-center ml-4">
          <div className="rounded-full overflow-hidden border-4 border-white w-28 h-28">
            <img
              src={imageSrc}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm text-gray-400">{user?.username}</div>
          <div className="text-sm text-gray-400">{user?.role}</div>
        </div>
        {filteredMenus.map((menu, i) => (
          <Link to={menu.link} key={i}>
            <div
              onClick={() => handleMenuClick(menu.content)}
              className={`group flex items-center text-sm gap-3.5 font-medium p-0 rounded-md cursor-pointer ${content === menu.content ? 'bg-gray-600' : 'hover:bg-gray-800'}`}
            >
              <div className="flex items-center text-sm gap-3.5 font-medium p-2 rounded-md cursor-pointer relative">
                {React.createElement(menu.icon, { size: '20' })}
              </div>
              <h2
                style={{ transitionDelay: `${i + 3}00ms` }}
                className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}
              >
                {menu.name}
              </h2>
              {/* {menu.notifications > 0 && (
                <span
                  className={`ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 ${!open && 'hidden'}`}
                >
                  {menu.notifications}
                </span>
              )} */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
