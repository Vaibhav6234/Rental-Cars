import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ userType, onLogout }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef()

  const handleLogout = () => {
    setDropdownOpen(false)
    setMobileMenuOpen(false)
    onLogout();
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

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
    <div className="relative bg-blue-950 text-white">
      {/* Main navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo - centered on desktop, left on mobile */}
        <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
          <Link to="/">
            <h1 className="text-xl md:text-3xl font-semibold cursor-pointer">Rental cars</h1>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 ml-auto items-center">
          <Link to="/search" className="hover:underline">Search Cars</Link>
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
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="bg-white text-blue-950 px-4 py-2 rounded hover:bg-gray-100">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto focus:outline-none"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-900 px-4 pb-4 space-y-3">
          <Link to="/search" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:underline">
            Search Cars
          </Link>
          {userType === "seller" && (
            <Link to="/rent" onClick={() => setMobileMenuOpen(false)} className="block bg-white text-blue-950 px-4 py-2 rounded text-center">
              Rent your car
            </Link>
          )}
          {userType ? (
            <>
              <div className="flex items-center gap-3 py-2 border-t border-blue-800">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-white" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white text-blue-950 flex items-center justify-center font-bold text-xs">
                    {getInitials(user?.name)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-blue-300">{user?.email}</p>
                </div>
              </div>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:underline">
                Edit Profile
              </Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 text-red-300 hover:text-red-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:underline">
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block bg-white text-blue-950 px-4 py-2 rounded text-center hover:bg-gray-100">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
