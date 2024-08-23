import React from 'react';
import { useAuth } from '../components/AuthContext';

const Navbar = ({ onSearch, setContent, content }) => {
  const { role } = useAuth();
  return (
    <nav className="bg-transparent text-white px-6 py-4 flex justify-between items-center flex-wrap">
      <div
        className="text-2xl text-gray-800 font-bold cursor-pointer mb-4 md:mb-0"
        onClick={() => {
          if (role === "admin") setContent(0);
        }}
      >
        My Dashboard
        {content === 1 && " / Services"}
        {content === 2 && " / Profile"}
        {content === 3 && " / Requests"}
        {content === 6 && " / Messages "}
      </div>
      <div className="relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
          className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none w-full md:w-auto"
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M13.293 14.707a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
