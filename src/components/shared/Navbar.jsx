// Navbar.js
import React, { useContext, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

import { BsMoon, BsSun } from "react-icons/bs";
import { ThemeContext } from "../../providers/theme/Theme";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/img/logo1.webp";
import logo2 from "../../assets/img/logo2.webp";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <header className="fixed bg-background top-0 left-0 w-full z-50 shadow-md">
      <nav className="max-w-screen-2xl w-full md:w-10/12 mx-auto py-4 px-4 flex justify-between items-center">
        {/* Logo + Website Name */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary"
        >
          <img src={logo} alt="Logo" className="w-14 h-14" />
          ZipShip
        </NavLink>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            Home
          </NavLink>

          <button className="relative focus:outline-none">
            <FaBell className="text-2xl text-text hover:text-primary transition duration-300" />
            {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span> */}
          </button>

          {/* User Authentication */}
          {user ? (
            <div className="relative">
              <img
                src={user?.photoURL || "/default-profile.png"}
                alt="User Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background shadow-lg rounded-lg p-4 text-text">
                  <p className="text-sm font-medium">{user.displayName}</p>
                  <hr className="my-2" />
                  <NavLink
                    to="/dashboard"
                    className="block py-2 px-4 text-sm hover:bg-gray-900 hover:text-white rounded-md"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={logOut}
                    className="w-full text-left py-2 px-4 text-sm hover:bg-gray-900 hover:text-white rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="btn bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition">
                Login
              </button>
            </Link>
          )}
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="focus:outline-none text-lg p-2 rounded-full bg-primary"
          >
            {isDarkMode ? (
              <BsSun className="text-yellow-300" />
            ) : (
              <BsMoon className="text-white" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
