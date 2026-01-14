import React, { useState, useRef } from 'react';
import { ArrowRight, List, LayoutGrid, Download, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import categoriesData from '../../data/categories.json';
import toursData from '../../data/tours.json';

const ListView = ({ theme, listType, onTourSelect, onNavigate, onShowSafety, onShowMembership }) => {
  const [listFilter, setListFilter] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  // Tab 状态应该根据 listType 自动设置
  const navigateTab = listType === 'season' ? 'seasonal' : 'regions';

  const topCategories = listType === 'season' ? categoriesData.season : categoriesData.destination;

  const filteredTours = listFilter
    ? toursData.tours.filter(t =>
        listType === 'season' ? t.season === listFilter : t.category === listFilter
      )
    : toursData.tours;

  const itemsPerPage = viewMode === 'list' ? 15 : 12;
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedTours = filteredTours.slice(startIdx, startIdx + itemsPerPage);

  const toggleFilter = (filterName) => {
    setListFilter(listFilter === filterName ? null : filterName);
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  const handleDownloadGuide = (lang = 'cn') => {
    const path = lang === 'cn' 
      ? 'images/categories/NectarTravel_Guidebook_CN.pdf' 
      : 'images/categories/NectarTravel_Guidebook_CN.pdf';
    const link = document.createElement('a');
    link.href = path;
    link.download = `Nectar_Travel_Guidebook_${lang.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 生成分页数字
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible + 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      pages.push('...');
      for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
    }
    return pages;
  };

  const scrollContainerRef = useRef(null);

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-500 animate-fade-in bg-pattern`}>
      {/* Category Filter Bar */}
      <div className="pt-[80px] md:pt-[90px]">
        <div className="h-[20vh] w-full grid grid-cols-4 gap-[1px] bg-white/10 mb-8">
          {topCategories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => toggleFilter(cat.name)}
              className={`relative group overflow-hidden cursor-pointer h-full border-b-4 transition-all duration-300 ${
                listFilter === cat.name ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition duration-700"
                style={
                  listFilter !== cat.name ? {
                    filter: 'grayscale(40%) saturate(0.7) brightness(0.9)'
                  } : {}
                }
              />
              <div
                className={`absolute inset-0 flex items-center justify-center transition ${
                  listFilter === cat.name ? 'bg-black/10' : 'bg-black/20 group-hover:bg-black/10'
                }`}
              >
                <span className="text-white font-serif italic text-base md:text-2xl tracking-widest drop-shadow-md">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-12 gap-8 md:gap-12 pb-20">
        {/* Tour List */}
        <div className="md:col-span-9 space-y-8">
          {/* Header with View Toggle */}
          <div className={`flex items-baseline justify-between mb-8 border-b ${theme.border} pb-4`}>
            <h2 className={`text-2xl md:text-3xl font-serif ${theme.text} capitalize`}>
              {listType} Collection
            </h2>
            <div className="flex items-center gap-3">
              <span className={`text-xs ${theme.textMuted}`}>
                {listFilter ? `Filtered by: ${listFilter}` : 'Showing All'} ({filteredTours.length})
              </span>
              <div className="flex gap-2 ml-4 border-l border-gray-200 pl-4">
                <button
                  onClick={() => handleViewModeChange('list')}
                  className={`p-2 rounded transition ${
                    viewMode === 'list'
                      ? 'bg-black text-white'
                      : 'hover:bg-black/10'
                  }`}
                  title="List View"
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-2 rounded transition ${
                    viewMode === 'grid'
                      ? 'bg-black text-white'
                      : 'hover:bg-black/10'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-8">
              {paginatedTours.map((tour) => (
                <div key={tour.id} onClick={() => onTourSelect(tour)} className="group cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center p-4 md:p-6 rounded-sm hover:bg-black/5 transition duration-300 bg-white/40 border border-transparent hover:border-gray-200">
                    <div className="h-48 md:h-56 w-full overflow-hidden rounded-sm">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>
                    <div className="flex flex-col justify-between h-full py-2">
                      <div>
                        <div className={`text-[10px] uppercase tracking-widest mb-3 ${theme.textMuted}`}>
                          {tour.category} / {tour.days} Days
                        </div>
                        <h3 className={`text-xl md:text-2xl font-serif ${theme.text} mb-4 group-hover:opacity-70 transition`}>
                          {tour.title}
                        </h3>
                        <p className={`text-sm ${theme.textMuted} leading-loose mb-4 border-l-2 border-gray-200 pl-4`}>
                          {tour.description}
                        </p>
                      </div>
                      <div className={`flex items-center justify-between mt-4 pt-4 border-t ${theme.border}`}>
                        <span className={`text-sm font-medium ${theme.textMuted} opacity-70`}>
                          Starting from {tour.currency} {tour.price}
                        </span>
                        <div className={`p-2 rounded-full border ${theme.border} group-hover:bg-black group-hover:text-white transition`}>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paginatedTours.map((tour) => (
                <div
                  key={tour.id}
                  onClick={() => onTourSelect(tour)}
                  className="group cursor-pointer bg-white/40 rounded-sm overflow-hidden hover:shadow-lg transition border border-transparent hover:border-gray-200"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>
                  <div className="p-4">
                    <div className={`text-[10px] uppercase tracking-widest mb-2 ${theme.textMuted}`}>
                      {tour.category}
                    </div>
                    <h3 className={`text-lg font-serif ${theme.text} mb-3 line-clamp-2 group-hover:opacity-70 transition`}>
                      {tour.title}
                    </h3>
                    <div className={`flex items-center justify-between mt-4 pt-4 border-t ${theme.border}`}>
                      <span className={`text-sm font-medium ${theme.textMuted}`}>
                        {tour.currency} {tour.price}
                      </span>
                      <div className={`p-1 rounded-full border ${theme.border} group-hover:bg-black group-hover:text-white transition`}>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 mb-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-black/10 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>

              {getPageNumbers().map((page, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${
                    page === currentPage
                      ? 'bg-black text-white'
                      : page === '...'
                      ? 'cursor-default'
                      : 'hover:bg-black/10'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-black/10 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden md:block md:col-span-3 relative">
          <div className="sticky top-28 pl-6 border-l border-gray-200/30">
            <h4 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${theme.textMuted}`}>
              Quick Navigate
            </h4>

            {/* Navigate Tabs - Toggle Switch Style */}
            <div className="mb-8 space-y-6">
              {/* Toggle Switch - Left/Right */}
              <div className="flex gap-2 bg-gray-200 p-1 rounded-lg">
                {/* Regions Button */}
                <button
                  onClick={() => {
                    setListFilter(null);
                    if (listType !== 'destination') {
                      onNavigate('list', 'destination');
                    }
                  }}
                  className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                    navigateTab === 'regions'
                      ? 'bg-black text-white shadow-md'
                      : 'bg-transparent text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Regions
                </button>

                {/* Seasonal Button */}
                <button
                  onClick={() => {
                    setListFilter(null);
                    onNavigate('list', 'season');
                  }}
                  className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                    navigateTab === 'seasonal'
                      ? 'bg-black text-white shadow-md'
                      : 'bg-transparent text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Seasonal
                </button>
              </div>

              {/* Safety Info Button */}
              <button
                onClick={onShowSafety}
                className="flex items-center gap-2 text-xs font-medium tracking-wide hover:opacity-60 transition w-full py-2"
              >
                <Shield size={16} className="opacity-50" />
                <span>Safety Info</span>
              </button>
            </div>

            <div className="space-y-8">
              {/* Membership Card */}
              <div
                onClick={onShowMembership}
                className="w-full aspect-[3/4] bg-black relative overflow-hidden group cursor-pointer rounded-sm"
              >
                <img
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=80"
                  alt="Membership"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <span className="text-white/80 font-serif italic text-lg mb-2">
                    The Inner Circle
                  </span>
                  <span className="text-white text-[10px] uppercase tracking-widest border border-white px-4 py-2 hover:bg-white hover:text-black transition">
                    Join Membership
                  </span>
                </div>
              </div>

              {/* Guidebook Card */}
              <div
                onClick={() => handleDownloadGuide('cn')}
                className="w-full aspect-[3/4] bg-gray-100 relative overflow-hidden group cursor-pointer rounded-sm border border-gray-300 hover:border-gray-400 transition"
              >
                <img
                  src="images/categories/guidebook.jpg"
                  alt="Guidebook"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/30 group-hover:bg-black/40 transition">
                  <span className="text-white/90 font-serif italic text-lg mb-4">
                    Nectar Travel Guidebook
                  </span>
                  <div className="flex items-center gap-2">
                    <Download size={14} className="text-white" />
                    <span className="text-white text-[10px] uppercase tracking-widest hover:underline">
                      Download En / 中
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;