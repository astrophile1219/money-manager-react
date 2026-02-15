import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import logo from "../assets/logo.png";
import Sidebar from "./Sidebar";

const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    setShowDropDown(false);
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    if (showDropDown) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDropDown]);

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-gray-200/50 border-b backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      {/* Left side - Menu button and title */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSideMenu ? (
            <X className="text-2xl" />
          ) : (
            <Menu className="text-2xl" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="h-10 w-10" />
          <span className="text-lg text-black truncate font-medium">
            Money Manager
          </span>
        </div>
      </div>

      {/* Right side- Profile photo */}
      <div ref={dropDownRef} className="relative">
        <button
          onClick={() => setShowDropDown(!showDropDown)}
          className="flex items-center justify-center cursor-pointer w-10  h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2"
        >
          <User className="text-purple-500" />
        </button>
        {/* Dropdown Menu */}
        {showDropDown && (
          <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                  <User className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium  text-gray-800 truncate">
                    {user?.fullname}
                  </p>
                  <p className="text-xs text-gray-500  truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Drop options */}
            <div className="py-1">
              <button
                onClick={handleLogOut}
                className="flex items-center cursor-pointer gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-100"
              >
                <LogOut className="w-4 h-4 text-gray-500" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile side menu */}
      {openSideMenu && (
        <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-18.25">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Menubar;
