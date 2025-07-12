import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
const NavBar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode");
  });
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
    if (darkMode === "active") {
      setDarkMode(null);
    } else {
      setDarkMode("active");
    }
  };

  return (
    <div className="navbar bg-white dark:bg-gray-800 shadow-sm ">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
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
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {darkMode === "active" ? (
          <MdDarkMode
            onClick={darkToggle}
            className="text-4xl rounded-full cursor-pointer text-gray-800 dark:text-white"
          />
        ) : (
          <div onClick={darkToggle}>close</div>
        )}

        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default NavBar;
