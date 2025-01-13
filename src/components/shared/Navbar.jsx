// Navbar.js
import React, { useContext, useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../providers/theme/Theme";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <header className="fixed bg-background top-0 left-0 w-full z-50 shadow-md">
      <nav className="max-w-screen-2xl w-11/12 mx-auto py-4 px-4 flex justify-between items-center">
        {/* Logo + Website Name */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary"
        >
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          MyWebsite
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
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
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
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 text-text">
                  <p className="text-sm font-medium">{user.displayName}</p>
                  <hr className="my-2" />
                  <NavLink
                    to="/dashboard"
                    className="block py-2 px-4 text-sm hover:bg-gray-100 rounded-md"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={logOut}
                    className="w-full text-left py-2 px-4 text-sm hover:bg-gray-100 rounded-md"
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
