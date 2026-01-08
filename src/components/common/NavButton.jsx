import React from 'react';

const NavButton = ({ label, onClick, active }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${
        active ? 'bg-white/20 text-white' : 'text-gray-200 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
};

export default NavButton;