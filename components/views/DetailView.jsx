import React from 'react';
import toursData from '../../data/tours.json';

const DetailView = ({ theme, selectedTour }) => {
  const tour = selectedTour || toursData.tours[0];

  return (
    <div className={`animate-fade-in ${theme.bg} min-h-screen bg-pattern`}>
      
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[70vh] w-full">
        <img 
          src={tour.image} 
          alt={tour.title}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 max-w-7xl mx-auto">
          <span className="text-white/80 text-xs uppercase tracking-[0.3em] mb-4 block">
            {tour.days} Days / {tour.category}
          </span>
          <h1 className="text-white text-3xl md:text-6xl font-serif italic">
            {tour.title}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 grid md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Itinerary */}
        <div className="md:col-span-8">
          <h2 className={`text-xl md:text-2xl font-serif italic mb-10 ${theme.text}`}>
            Journey Itinerary
          </h2>
          
          <div className={`space-y-12 pl-4 border-l ${theme.border}`}>
            {tour.itinerary.map((item) => (
              <div key={item.day} className="relative pl-8 group">
                {/* Timeline Dot */}
                <div className={`absolute -left-[5px] top-2 w-2 h-2 rounded-full ${theme.accent} outline outline-4 outline-gray-100/0 group-hover:outline-gray-200/50 transition-all duration-500`} />
                
                <h3 className={`text-base md:text-lg font-bold ${theme.text} mb-1`}>
                  Day {item.day} 
                  <span className={`font-normal text-sm ${theme.textMuted} ml-2`}>
                    — {item.title}
                  </span>
                </h3>
                <p className={`text-sm ${theme.textMuted} leading-relaxed`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Highlights Section */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="mt-12 pt-12 border-t border-gray-200">
              <h3 className={`text-xl font-serif italic mb-6 ${theme.text}`}>
                Experience Highlights
              </h3>
              <ul className={`space-y-3 ${theme.textMuted}`}>
                {tour.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-3 mt-1">✦</span>
                    <span className="text-sm leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Booking Card */}
        <div className="md:col-span-4">
          <div className={`sticky top-24 p-6 md:p-8 border ${theme.border} bg-white/5 backdrop-blur-sm rounded-sm`}>
            
            {/* Price */}
            <div className="flex items-baseline justify-between mb-8">
              <span className={`text-xs uppercase tracking-widest ${theme.textMuted}`}>
                Total Price
              </span>
              <div className={`text-right`}>
                <div className={`text-2xl md:text-3xl font-serif ${theme.text}`}>
                  {tour.currency === 'CNY' ? '¥' : '$'}{tour.price}
                </div>
                <div className={`text-[10px] ${theme.textMuted} mt-1`}>
                  per person
                </div>
              </div>
            </div>

            {/* Tour Details */}
            <div className={`space-y-3 mb-8 pb-8 border-b ${theme.border}`}>
              <div className="flex justify-between text-sm">
                <span className={theme.textMuted}>Duration</span>
                <span className={theme.text}>{tour.days} Days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={theme.textMuted}>Season</span>
                <span className={theme.text}>{tour.season}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={theme.textMuted}>Destination</span>
                <span className={theme.text}>{tour.category}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              type="button" 
              className={`w-full py-3 md:py-4 text-xs font-bold uppercase tracking-[0.2em] ${theme.accent} ${theme.accentText} hover:opacity-90 transition`}
            >
              Request Booking
            </button>

            {/* Additional Info */}
            <p className={`text-[10px] ${theme.textMuted} text-center mt-4 leading-relaxed`}>
              Our travel architects will contact you within 24 hours to curate your perfect journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;