import React, { useState } from 'react';

// Styles
import GlobalStyles from './styles/GlobalStyles';

// Config & Themes
import { themes } from './config/themes';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ThemeSwitcher from './components/layout/ThemeSwitcher';

// Common Components
import SafetyModal from './components/common/SafetyModal';
import MembershipModal from './components/common/MembershipModal';

// View Components
import HomeView from './components/views/HomeView';
import ListView from './components/views/ListView';
import DetailView from './components/views/DetailView';
import AboutView from './components/views/AboutView';
import CategoryLandingView from './components/views/CategoryLandingView';
import ProductGridView from './components/views/ProductGridView';

const App = () => {
  // State Management
  const [currentView, setCurrentView] = useState('home');
  const [listType, setListType] = useState('destination');
  const [selectedTour, setSelectedTour] = useState(null);
  const [themeKey, setThemeKey] = useState('classic');
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [gridTitle, setGridTitle] = useState('');
  const [categoryType, setCategoryType] = useState('cruise'); // 'cruise' or 'ticket'

  const theme = themes[themeKey];

  // Navigation Handlers
  const handleNavigate = (view, type = null) => {
    if (view === 'home') {
      setCurrentView('home');
    } else if (view === 'list') {
      setCurrentView('list');
      setListType(type || 'destination');
    } else if (view === 'about') {
      setCurrentView('about');
    } else if (view === 'cruise') {
      setCurrentView('category');
      setCategoryType('cruise');
    } else if (view === 'ticket') {
      setCurrentView('category');
      setCategoryType('ticket');
    } else if (view === 'contact') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
    window.scrollTo(0, 0);
  };

  const handleTourSelect = (tour) => {
    setSelectedTour(tour);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  };

  const handleNavigateToGrid = (categoryTitle) => {
    setGridTitle(categoryTitle);
    setCurrentView('grid');
    window.scrollTo(0, 0);
  };

  // View Rendering
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            theme={theme}
            onNavigate={handleNavigate}
            onTourSelect={handleTourSelect}
          />
        );
      
      case 'list':
        return (
          <ListView 
            theme={theme}
            listType={listType}
            onTourSelect={handleTourSelect}
            onNavigate={handleNavigate}
            onShowSafety={() => setShowSafetyModal(true)}
            onShowMembership={() => setShowMembershipModal(true)}
          />
        );
      
      case 'detail':
        return (
          <DetailView 
            theme={theme}
            selectedTour={selectedTour}
          />
        );
      
      case 'about':
        return (
          <AboutView theme={theme} />
        );
      
      case 'category':
        return (
          <CategoryLandingView 
            theme={theme}
            category={categoryType}
            onNavigateToGrid={handleNavigateToGrid}
          />
        );
      
      case 'grid':
        return (
          <ProductGridView 
            theme={theme}
            gridTitle={gridTitle}
            onNavigate={handleNavigate}
          />
        );
      
      default:
        return (
          <HomeView 
            theme={theme}
            onNavigate={handleNavigate}
            onTourSelect={handleTourSelect}
          />
        );
    }
  };

  return (
  <div className={`font-sans ...`}>
    {/* 临时添加这一行 */}
    <h1 style={{color: 'red', fontSize: '100px', position: 'fixed', zIndex: 9999}}>HELLO TEST</h1>
      <GlobalStyles />

      {/* Header */}
      <Header 
        theme={theme}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main>
        {renderView()}
      </main>

      {/* Footer */}
      <Footer 
        theme={theme}
        onNavigate={handleNavigate}
      />

      {/* Theme Switcher */}
      <ThemeSwitcher 
        currentTheme={themeKey}
        onThemeChange={setThemeKey}
      />

      {/* Modals */}
      <SafetyModal 
        isOpen={showSafetyModal}
        onClose={() => setShowSafetyModal(false)}
      />
      <MembershipModal 
        isOpen={showMembershipModal}
        onClose={() => setShowMembershipModal(false)}
      />
    </div>
  );
};

export default App;
