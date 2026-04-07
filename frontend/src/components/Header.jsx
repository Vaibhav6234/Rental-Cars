import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ userType, onLogout }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef()

  const handleLogout = () => {
    setDropdownOpen(false)
    onLogout();
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative flex items-center justify-between px-8 py-4 bg-blue-950 text-white">
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link to="/">
          <h1 className="text-3xl font-semibold cursor-pointer">Rental cars</h1>
        </Link>
      </div>
      <div className="flex gap-6 ml-auto items-center">
        <Link to="/search" className="hover:underline">
          Search Cars
        </Link>
        {userType === "seller" && (
          <Link to="/rent" className="bg-white text-blue-950 px-4 py-2 rounded">
            Rent your car
          </Link>
        )}
        {userType ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              title={user?.name}
              className="focus:outline-none"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white hover:border-blue-300 transition"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white text-blue-950 flex items-center justify-center font-bold text-sm hover:bg-blue-100 transition cursor-pointer">
                  {getInitials(user?.name)}
                </div>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-sm truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50 transition"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                >
                   Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="text-lg hover:underline">
              Login
            </Link>
            <Link to="/register" className="bg-white text-blue-950 px-4 py-2 rounded hover:bg-gray-100">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
