import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ theme, currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 导航菜单项
  const navItems = [
    { label: 'SEASON', view: 'home' },
    { label: 'DESTINATION', view: 'list' },
    { label: 'ABOUT', view: 'about' },
    { label: 'CONTACT', view: 'home' }
  ];

  const handleNavigate = (view) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      {/* 桌面端导航栏 */}
      <nav className="hidden md:flex container mx-auto px-4 py-6 justify-between items-center">
        {/* 左侧菜单 */}
        <div className="flex space-x-8 flex-1">
          <button
            onClick={() => handleNavigate('home')}
            className="text-gray-800 font-medium hover:text-gray-600 transition"
          >
            SEASON
          </button>
          <button
            onClick={() => handleNavigate('list')}
            className="text-gray-800 font-medium hover:text-gray-600 transition"
          >
            DESTINATION
          </button>
        </div>

        {/* 中间 Logo */}
        <h1
          className="text-2xl font-serif text-gray-800 cursor-pointer hover:text-gray-600 transition flex-shrink-0 mx-8"
          onClick={() => handleNavigate('home')}
        >
          Nectar TRAVEL
        </h1>

        {/* 右侧菜单 */}
        <div className="flex space-x-8 flex-1 justify-end">
          <button
            onClick={() => handleNavigate('about')}
            className="text-gray-800 font-medium hover:text-gray-600 transition"
          >
            ABOUT
          </button>
          <button
            onClick={() => handleNavigate('home')}
            className="text-gray-800 font-medium hover:text-gray-600 transition"
          >
            CONTACT
          </button>
        </div>
      </nav>

      {/* 移动端导航栏 */}
      <nav className="md:hidden flex items-center justify-between px-4 py-4">
        {/* 汉堡菜单按钮 */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800 p-2"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 中间 Logo */}
        <h1
          className="text-lg font-serif text-gray-800 cursor-pointer"
          onClick={() => handleNavigate('home')}
        >
          Nectar TRAVEL
        </h1>

        {/* 占位符保持布局 */}
        <div className="w-10" />
      </nav>

      {/* 移动端下拉菜单 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col space-y-4 px-4 py-4">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavigate(item.view)}
                className="text-gray-800 font-medium text-left hover:text-gray-600 transition py-2 border-b border-gray-200 last:border-b-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;