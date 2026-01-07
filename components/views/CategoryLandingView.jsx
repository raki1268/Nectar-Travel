import React from 'react';
import { ArrowRight } from 'lucide-react';
import contentData from '../../data/content.json';

const CategoryLandingView = ({ theme, category, onNavigateToGrid }) => {
  // category can be 'cruise' or 'ticket'
  const data = contentData[category];

  return (
    <div className={`animate-fade-in ${theme.bg} min-h-screen bg-pattern pb-20`}>
      
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden mb-12">
        <img 
          src={data.heroImage} 
          alt={data.title}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white px-4">
          <h1 className="font-serif text-3xl md:text-5xl italic mb-4 text-center">
            {data.title}
          </h1>
          <p className="uppercase tracking-widest text-xs md:text-sm opacity-90">
            {data.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Routes Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {data.routes.map((route, idx) => (
            <div 
              key={idx} 
              className="bg-white/50 border border-gray-200 p-4 group hover:shadow-lg transition duration-500 flex flex-col rounded-sm"
            >
              {/* Route Image */}
              <div className="relative h-48 mb-4 overflow-hidden rounded-sm">
                <img 
                  src={route.image} 
                  alt={route.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                />
                {/* Type Badge */}
                <div className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase px-2 py-1 tracking-widest">
                  {route.type}
                </div>
              </div>

              {/* Route Info */}
              <h3 className={`font-serif text-lg md:text-xl mb-2 ${theme.text}`}>
                {route.title}
              </h3>
              
              {route.description && (
                <p className={`text-xs md:text-sm ${theme.textMuted} mb-4 flex-grow`}>
                  {route.description}
                </p>
              )}

              <div className={`w-full h-[1px] ${theme.border} bg-current my-4`} />

              {/* CTA */}
              <button 
                onClick={() => onNavigateToGrid(route.type)} 
                className="text-xs font-bold uppercase tracking-widest flex items-center hover:text-blue-600 mt-auto transition"
              >
                Explore Products <ArrowRight size={12} className="ml-2" />
              </button>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        {data.partners && data.partners.length > 0 && (
          <div className={`py-12 border-t border-b ${theme.border} mb-16`}>
            <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-8 text-center ${theme.textMuted}`}>
              Our Trusted Partners
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {data.partners.map((partner, idx) => (
                <div 
                  key={idx} 
                  className={`text-sm font-medium ${theme.text} opacity-50 hover:opacity-100 transition`}
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles Section */}
        {data.articles && data.articles.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h3 className={`text-xl md:text-2xl font-serif italic mb-8 ${theme.text}`}>
              Latest Insights
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {data.articles.map((article, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 border ${theme.border} hover:shadow-md transition cursor-pointer group rounded-sm bg-white/20`}
                >
                  <div className={`text-[10px] uppercase tracking-widest ${theme.textMuted} mb-3`}>
                    {article.date}
                  </div>
                  <h4 className={`text-base md:text-lg font-medium ${theme.text} group-hover:opacity-70 transition`}>
                    {article.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryLandingView;