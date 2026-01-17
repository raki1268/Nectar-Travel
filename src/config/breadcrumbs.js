/**
 * 面包屑导航配置
 * 根据当前视图和参数返回对应的面包屑数组
 */

export const getBreadcrumbs = (currentView, params = {}) => {
  const breadcrumbsMap = {
    // Home 页面
    home: [],

    // List 页面
    list: [
      {
        label: params.listType === 'destination' ? 'Destinations' : 'Seasons',
        view: 'list',
        params: { listType: params.listType },
        action: 'navigate'
      }
    ],

    // Category 页面（Cruises 或 Tickets）
    category: [
      {
        label: params.categoryType === 'cruise' ? 'Cruises' : 'Tickets',
        view: 'category',
        params: { categoryType: params.categoryType },
        action: 'navigate'
      }
    ],

    // Grid 页面
    grid: [
      {
        label: params.categoryType === 'cruise' ? 'Cruises' : 'Tickets',
        view: 'category',
        params: { categoryType: params.categoryType },
        action: 'navigate'
      },
      {
        label: params.gridTitle || 'Products',
        view: 'grid',
        action: 'navigate'
      }
    ],

    // Detail 页面
    detail: [
      {
        label: params.fromView === 'list' 
          ? (params.listType === 'destination' ? 'Destinations' : 'Seasons')
          : (params.categoryType === 'cruise' ? 'Cruises' : 'Tickets'),
        view: params.fromView === 'list' ? 'list' : 'category',
        params: params.fromView === 'list' 
          ? { listType: params.listType }
          : { categoryType: params.categoryType },
        action: 'navigate'
      },
      ...(params.fromView === 'grid' ? [{
        label: params.gridTitle || 'Products',
        view: 'grid',
        params: { gridTitle: params.gridTitle },
        action: 'navigate'
      }] : []),
      {
        label: params.tourTitle || 'Tour Details',
        view: 'detail',
        action: 'navigate'
      }
    ],

    // About 页面
    about: [
      {
        label: 'About Us',
        view: 'about',
        action: 'navigate'
      }
    ],

    // Default
    default: []
  };

  return breadcrumbsMap[currentView] || breadcrumbsMap.default;
};

/**
 * 面包屑标签映射
 * 用于统一管理所有可能的面包屑标签
 */
export const breadcrumbLabels = {
  home: 'Home',
  destinations: 'Destinations',
  seasons: 'Seasons',
  cruises: 'Cruises',
  tickets: 'Tickets',
  about: 'About Us',
  products: 'Products',
  tourDetails: 'Tour Details',
  category: 'Category',
  list: 'List'
};

/**
 * 视图映射关系
 * 用于理解各个视图之间的层级关系
 */
export const viewHierarchy = {
  home: {
    label: 'Home',
    children: ['list', 'category', 'about']
  },
  list: {
    label: 'List',
    parent: 'home',
    children: ['detail']
  },
  category: {
    label: 'Category',
    parent: 'home',
    children: ['grid', 'detail']
  },
  grid: {
    label: 'Grid',
    parent: 'category',
    children: ['detail']
  },
  detail: {
    label: 'Details',
    parent: 'category', // 可以是 list, category, 或 grid
    children: []
  },
  about: {
    label: 'About',
    parent: 'home',
    children: []
  }
};