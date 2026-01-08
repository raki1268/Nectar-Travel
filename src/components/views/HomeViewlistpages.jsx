import React, { useState } from 'react';
import { ArrowRight, Globe, Calendar, Shield } from 'lucide-react';
import categoriesData from '../../data/categories.json';
import toursData from '../../data/tours.json';

const ListView = ({ theme, listType, onTourSelect, onNavigate, onShowSafety, onShowMembership }) => {
  const [listFilter, setListFilter] = useState(null);

  const topCategories = listType === 'season' 
    ? categoriesData.season 
    : categoriesData.destination;

  const filteredTours = listFilter 
    ? toursData.tours.filter(t => 
        listType === 'season' 
          ? t.season === listFilter 
          : t.category === listFilter
      )
    : toursData.tours;

  const toggleFilter = (filterName) => {
    setListFilter(listFilter === filterName ? null : filterName);
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-500 animate-fade-in bg-pattern`}>
      
      {/* Category Filter Bar */}
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
              className={`w-full h-full object-cover transition duration-700 ${
                listFilter === cat.name ? 'filter-none' : 'sepia-brown group-hover:filter-none'
              }`} 
            />
            <div className={`absolute inset-0 flex items-center justify-center transition ${
              listFilter === cat.name ? 'bg-black/10' : 'bg-black/20 group-hover:bg-black/10'
            }`}>
              <span className="text-white font-serif italic text-base md:text-2xl tracking-widest drop-shadow-md">
                {cat.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-12 gap-8 md:gap-12 pb-20">
        
        {/* Tour List */}
        <div className="md:col-span-9 space-y-8">
          <div className={`flex items-baseline justify-between mb-8 border-b ${theme.border} pb-4`}>
            <h2 className={`text-2xl md:text-3xl font-serif ${theme.text} capitalize`}>
              {listType} Collection
            </h2>
            <span className={`text-xs ${theme.textMuted}`}>
              {listFilter ? `Filtered by: ${listFilter}` : 'Showing All'} ({filteredTours.length})
            </span>
          </div>

          {filteredTours.map((tour) => (
            <div 
              key={tour.id} 
              onClick={() => onTourSelect(tour)} 
              className="group cursor-pointer"
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center p-4 md:p-6 rounded-sm hover:bg-black/5 transition duration-300 bg-white/40 border border-transparent hover:border-gray-200">
                
                {/* Tour Image */}
                <div className="h-48 md:h-56 w-full overflow-hidden rounded-sm">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                  />
                </div>

                {/* Tour Info */}
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

        {/* Sidebar */}
        <div className="hidden md:block md:col-span-3 relative">
          <div className="sticky top-28 pl-6 border-l border-gray-200/30">
            <h4 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${theme.textMuted}`}>
              Quick Navigate
            </h4>
            
            <div className="space-y-6 mb-12">
              {[
                { 
                  icon: Globe, 
                  label: 'All Regions', 
                  action: () => setListFilter(null) 
                },
                { 
                  icon: Calendar, 
                  label: 'Seasonal', 
                  action: () => onNavigate('list', 'season') 
                },
                { 
                  icon: Shield, 
                  label: 'Safety Info', 
                  action: onShowSafety 
                }
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={item.action} 
                  className={`flex items-center group cursor-pointer ${theme.text} hover:opacity-60 transition`}
                >
                  <item.icon size={16} className="mr-3 opacity-50" />
                  <span className="text-xs font-medium tracking-wide">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Membership Card */}
            <div 
              onClick={onShowMembership} 
              className="w-full aspect-[3/4] bg-black relative overflow-hidden group cursor-pointer"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;