import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../User/AuthContext';

const UserAvatar = ({ size = 'md' }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const firstLetter = user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || '?';

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`${sizeClasses[size]} bg-green-600 text-white rounded-full flex items-center justify-center font-medium cursor-pointer hover:bg-green-700 transition-colors`}
        onClick={() => setShowDropdown(!showDropdown)}
        title={user.name || user.email}
      >
        {firstLetter}
      </div>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;