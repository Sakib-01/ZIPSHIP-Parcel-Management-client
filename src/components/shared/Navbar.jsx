import React, { useContext, useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BsMoon, BsSun } from "react-icons/bs";
import { ThemeContext } from "../../providers/theme/Theme";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/img/logo1.webp";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home"); // Default section
  const location = useLocation();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id); // Set active section when clicked
    }
  };

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(target);
    } else {
      navigate("/", { replace: true });
      setTimeout(() => scrollToSection(target), 100);
    }
  };

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "feature", "about", "review", "contact"];
      let currentSection = "home";

      for (let id of sections) {
        const section = document.getElementById(id);
        if (
          section &&
          section.getBoundingClientRect().top <= window.innerHeight / 3
        ) {
          currentSection = id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          {[
            { id: "home", defaultText: "Home", activeText: "Home" },
            { id: "feature", defaultText: "Feature", activeText: "Feature" },
            { id: "about", defaultText: "About", activeText: "About" },
            { id: "review", defaultText: "Review", activeText: "Review" },
            { id: "contact", defaultText: "Contact", activeText: "Contact" },
          ].map((item) => (
            <NavLink
              key={item.id}
              to="/"
              onClick={(e) => handleLinkClick(e, item.id)}
              className={`text-lg font-medium ${
                activeSection === item.id
                  ? "text-primary underline"
                  : "hover:underline hover:text-primary"
              }`}
            >
              {activeSection === item.id ? item.activeText : item.defaultText}
            </NavLink>
          ))}

          {/* Notification Icon */}
          <button className="relative focus:outline-none">
            <FaBell className="text-2xl text-text hover:text-primary transition duration-300" />
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
