import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";

import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import useAuth from "../../Context/AuthContext/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Logout error:", error.code, error.message);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: "An error occurred while logging out. Please try again.",
        });
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMySubmissions = () => {
    navigate("/dashboard", { state: { tab: "my-submissions" } });
  };
  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 rounded-full cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition duration-200"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {user?.displayName || "Guest"}
        </span>
        {user?.photoURL ? (
          <img
            className="size-12 rounded-full"
            src={user.photoURL}
            alt="profile"
            referrerPolicy="no-referer-policy"
          />
        ) : (
          <span className="text-gray-600 dark:text-gray-300">👤</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-md shadow-lg z-50">
          <div className="py-2">
            <Link
              to="/create-assignment"
              className="block px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition duration-200 hover:scale-105"
            >
              Create Assignment
            </Link>
            <Link
              onClick={handleMySubmissions}
              to="/dashboard"
              className="block px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition duration-200 hover:scale-105"
            >
              My Submissions
            </Link>
            <button
              onClick={handleLogout}
              className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition duration-200 hover:scale-105"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
