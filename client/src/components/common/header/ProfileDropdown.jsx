import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProfileDropdown = ({ token, imageSrc, user, logout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleProfileClick = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleLogout = () => {
        if (logout) {
            logout();
        }
        navigate("/");
    };

    return (
        <div className="relative">
            {token && (
                <div className="flex flex-col items-center ml-4">
                    <div
                        className="rounded-full overflow-hidden border-4 border-white w-10 h-10 cursor-pointer"
                        onClick={handleProfileClick}
                    >
                        <img
                            src={imageSrc}
                            alt="Profile Preview"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="text-sm text-gray-400">{user?.role}</div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div
                            className="absolute top-full left-0 mt-2 w-48 bg-[#334155] text-white shadow-lg rounded-lg"
                            ref={dropdownRef}
                        >
                            <Link
                                to="/dashboard"
                                className="block py-2 px-4 hover:bg-blue-900 text-center"
                            >
                                {t("dashboard")}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full py-2 px-4 hover:bg-blue-900 text-center"
                            >
                                {t("logout")}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
