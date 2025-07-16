import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode");
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (darkMode === "active") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "active");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("darkMode");
    }
  }, [darkMode]);

  const darkToggle = () => {
    setDarkMode((prev) => (prev === "active" ? null : "active"));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Assignments", path: "/assignments" },
    { name: "Pending Assignments", path: "/groups" },
    { name: "Resources", path: "/resources" },
    { name: "Profile", path: "/profile" },
  ];
  return (
    <div
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-transparent"
      }`}
    >
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Home</a>
              </li>

              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a
            href="/"
            className={`cursor-pointer font-logo font-bold text-4xl transition-colors duration-300 ${
              scrolled ? "text-[#4BCCA8]" : "text-white"
            }`}
          >
            StudySphere
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a
                className={
                  scrolled ? "text-gray-800 dark:text-white" : "text-white"
                }
              >
                Item 1
              </a>
            </li>
            <li>
              <details>
                <summary
                  className={
                    scrolled ? "text-gray-800 dark:text-white" : "text-white"
                  }
                >
                  Parent
                </summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a
                className={
                  scrolled ? "text-gray-800 dark:text-white" : "text-white"
                }
              >
                Item 3
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar-end space-x-4">
          {darkMode === "active" ? (
            <MdDarkMode
              onClick={darkToggle}
              className="text-4xl rounded-full cursor-pointer text-white"
            />
          ) : (
            <CiLight
              onClick={darkToggle}
              className={`text-4xl rounded-full cursor-pointer ${
                scrolled ? "text-gray-800" : "text-white"
              }`}
            />
          )}
          <a className="btn bg-[#4BCCA8] text-white border-none hover:bg-emerald-600 flex items-center justify-center">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
