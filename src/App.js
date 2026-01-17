import React, { useState } from 'react';

// eslint-disable-next-line
import GlobalStyles from './styles/GlobalStyles';

// Config & Themes
import { themes } from './config/themes';
import { getBreadcrumbs } from './config/breadcrumbs';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ThemeSwitcher from './components/layout/ThemeSwitcher';
import Breadcrumb from './components/common/Breadcrumb';

// Common Components
import SafetyModal from './components/common/SafetyModal';
import MembershipModal from './components/common/MembershipModal';

// View Components
import HomeView from './components/views/HomeView';
import ListView from './components/views/HomeViewlistpages';
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
  const [categoryType, setCategoryType] = useState('cruise');
  
  // Navigation History Stack
  const [navigationStack, setNavigationStack] = useState([
    { view: 'home', params: {} }
  ]);

  // 当前页面的参数
  const [viewParams, setViewParams] = useState({
    listType,
    categoryType,
    gridTitle,
    tourTitle: selectedTour?.title || '',
    tourId: selectedTour?.id || null,
    fromView: 'home' // 上一个视图是什么
  });

  const theme = themes[themeKey];

  /**
   * 推入导航历史
   */
  const pushNavigation = (newView, newParams = {}) => {
    setNavigationStack(prev => [
      ...prev,
      { view: newView, params: { ...viewParams, ...newParams } }
    ]);
  };

  /**
   * 返回上一页
   */
  const handleGoBack = (steps = 1) => {
    if (navigationStack.length <= 1) {
      // 如果已经在第一页，返回 home
      handleNavigate('home');
      return;
    }

    const newStack = navigationStack.slice(0, -steps);
    const previousState = newStack[newStack.length - 1];

    setNavigationStack(newStack);
    
    // 恢复上一个状态
    applyViewState(previousState.view, previousState.params);
    
    window.scrollTo(0, 0);
  };

  /**
   * 应用视图状态
   */
  const applyViewState = (view, params = {}) => {
    setCurrentView(view);
    setListType(params.listType || 'destination');
    setCategoryType(params.categoryType || 'cruise');
    setGridTitle(params.gridTitle || '');
    
    if (params.tourId) {
      setSelectedTour({ 
        id: params.tourId, 
        title: params.tourTitle 
      });
    }

    setViewParams({
      listType: params.listType || 'destination',
      categoryType: params.categoryType || 'cruise',
      gridTitle: params.gridTitle || '',
      tourTitle: params.tourTitle || '',
      tourId: params.tourId || null,
      fromView: params.fromView || 'home'
    });
  };

  // Navigation Handlers
  const handleNavigate = (view, type = null) => {
    const newParams = { fromView: currentView };

    if (view === 'home') {
      setNavigationStack([{ view: 'home', params: {} }]);
      setCurrentView('home');
      setViewParams({ fromView: 'home' });
    } else if (view === 'list') {
      const listTypeValue = type || 'destination';
      setListType(listTypeValue);
      setCurrentView('list');
      newParams.listType = listTypeValue;
      pushNavigation('list', { ...newParams, listType: listTypeValue });
      setViewParams(prev => ({ ...prev, listType: listTypeValue, fromView: currentView }));
    } else if (view === 'about') {
      setCurrentView('about');
      pushNavigation('about', newParams);
      setViewParams(prev => ({ ...prev, fromView: currentView }));
    } else if (view === 'cruise') {
      setCategoryType('cruise');
      setCurrentView('category');
      newParams.categoryType = 'cruise';
      pushNavigation('category', { ...newParams, categoryType: 'cruise' });
      setViewParams(prev => ({ ...prev, categoryType: 'cruise', fromView: currentView }));
    } else if (view === 'ticket') {
      setCategoryType('ticket');
      setCurrentView('category');
      newParams.categoryType = 'ticket';
      pushNavigation('category', { ...newParams, categoryType: 'ticket' });
      setViewParams(prev => ({ ...prev, categoryType: 'ticket', fromView: currentView }));
    } else if (view === 'contact') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return;
    }
    window.scrollTo(0, 0);
  };

  const handleTourSelect = (tour) => {
    setSelectedTour(tour);
    const newParams = {
      fromView: currentView,
      tourId: tour.id,
      tourTitle: tour.title,
      listType,
      categoryType,
      gridTitle
    };
    pushNavigation('detail', newParams);
    setCurrentView('detail');
    setViewParams(newParams);
    window.scrollTo(0, 0);
  };

  const handleNavigateToGrid = (categoryTitle) => {
    setGridTitle(categoryTitle);
    const newParams = {
      fromView: currentView,
      categoryType,
      gridTitle: categoryTitle
    };
    pushNavigation('grid', newParams);
    setCurrentView('grid');
    setViewParams(newParams);
    window.scrollTo(0, 0);
  };

  // 获取当前视图的面包屑
  const breadcrumbs = getBreadcrumbs(currentView, viewParams);

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
    <div className={`font-sans selection:bg-gray-300 selection:text-black ${theme.bg} transition-colors duration-500`}>
      {/* Global Styles */}

      {/* Header */}
      <Header 
        theme={theme}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Breadcrumb Navigation */}
      {currentView !== 'home' && (
        <Breadcrumb 
          breadcrumbs={breadcrumbs}
          theme={theme}
          onNavigate={handleNavigate}
          onGoBack={handleGoBack}
        />
      )}

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