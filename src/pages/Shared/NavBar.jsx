import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { Link, NavLink, useLocation } from "react-router";

import Profile from "./Profile";
import useAuth from "../../Context/AuthContext/useAuth";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode");
  });
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
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
    setDarkMode((prev) => (prev === "active" ? "hidden" : "active"));
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
    { name: "Pending Assignments", path: "/pending-assignments" },
  ];
  return (
    <div
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled || location.pathname !== "/"
          ? "bg-[#F5F5F5] shadow-md dark:bg-gray-900"
          : "bg-transparent"
      }`}
    >
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-ghost ${
                location.pathname !== "/" || scrolled
                  ? "text-black dark:text-white"
                  : "text-white "
              }  lg:hidden`}
            >
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
              className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <a
                href="/"
                className={`cursor-pointer font-logo font-bold text-xl mb-4 text-center transition-colors duration-300 ${
                  scrolled || location.pathname !== "/"
                    ? "text-light-primary dark:text-white"
                    : "text-white"
                }`}
              >
                StudySphere
              </a>
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    to={item.path}
                    className={({ isActive }) =>
                      `transition-colors duration-300 text-white  ${
                        isActive ? "text-[#4BCCA8] font-semibold" : ""
                      } `
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <a
            href="/"
            className={`cursor-pointer hidden md:block font-logo font-bold text-4xl  transition-colors duration-300 ${
              scrolled || location.pathname !== "/"
                ? "text-light-primary dark:text-white"
                : "text-white"
            }`}
          >
            StudySphere
          </a>
        </div>

        <div className="navbar-end hidden lg:flex w-full">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  to={item.path}
                  className={({ isActive }) =>
                    `transition-colors duration-300  ${
                      isActive
                        ? "text-emerald-400 font-semibold"
                        : "dark:text-white text-white"
                    }${`${
                      location.pathname !== "/" || scrolled
                        ? "text-light-primary"
                        : ""
                    }`}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex justify-end space-x-4 items-center">
          <button
            onClick={darkToggle}
            className="text-4xl rounded-full cursor-pointer "
          >
            {darkMode === "active" ? (
              <CiLight className="text-white" />
            ) : (
              <MdDarkMode
                className={`${
                  scrolled || location.pathname !== "/"
                    ? "text-black"
                    : "text-white"
                }`}
              />
            )}
          </button>
          {user ? (
            <Profile></Profile>
          ) : (
            <Link to="auth">
              <button className="px-4 w-max py-2 cursor-pointer rounded-md  bg-emerald-400 text-white border-none hover:bg-emerald-500 flex items-center justify-center">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
