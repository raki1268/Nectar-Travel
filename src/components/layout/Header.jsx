import React from 'react';

const Header = ({ theme, currentView, onNavigate }) => {
  return (
    <header className={`${theme?.primary || 'bg-blue-600'} p-4 text-white`}>
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => onNavigate('home')}>
          Nectar Travel
        </h1>
        <div className="space-x-4">
          <button onClick={() => onNavigate('home')}>首页</button>
          <button onClick={() => onNavigate('list')}>目的地</button>
          <button onClick={() => onNavigate('about')}>关于我们</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;