import React from 'react';
import { Book } from 'lucide-react';
import { themes } from '../../config/themes';

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="fixed bottom-8 left-8 z-50 flex gap-4">
      {Object.keys(themes).map((key) => (
        <button
          key={key}
          onClick={() => onThemeChange(key)}
          className="group transition-transform duration-300 hover:-translate-y-1 relative"
          title={themes[key].name}
        >
          {/* Theme Icon */}
          <div 
            className={`relative w-8 h-10 rounded-[2px] shadow-md border-l-4 border-black/20 flex items-center justify-center
              ${key === 'classic' ? 'bg-white' : key === 'nature' ? 'bg-[#E8E8E0]' : 'bg-[#262626]'}`}
          >
            <Book 
              size={16} 
              color={key === 'luxury' ? '#C5A059' : key === 'nature' ? '#4A5D4E' : '#000'} 
            />
          </div>

          {/* Theme Name Tooltip */}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 bg-black text-white px-1 py-0.5 rounded transition-opacity whitespace-nowrap">
            {themes[key].name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;