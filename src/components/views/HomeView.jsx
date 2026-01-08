import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Anchor, Palette, Ticket, Users, Tent } from 'lucide-react';
import HoverImageCard from '../common/HoverImageCard';
import contentData from '../../data/content.json';
import toursData from '../../data/tours.json';
import { siteConfig } from '../../config/siteConfig';

const HomeView = ({ theme, onNavigate, onTourSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef(null);
  const heroContent = contentData.homepage;
  const featuredTours = toursData.tours.filter(tour => tour.featured);

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroContent.heroSlides.length]);

  // Carousel scroll handlers
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  const quickCategories = [
    { Icon: Anchor, label: 'Cruise', action: () => onNavigate('cruise') },
    { Icon: Palette, label: 'Art', action: () => onNavigate('list', 'destination') },
    { Icon: Ticket, label: 'Ticket', action: () => onNavigate('ticket') },
    { Icon: Users, label: 'Private', action: () => onNavigate('list', 'destination') },
    { Icon: Tent, label: 'Glamping', action: () => onNavigate('list', 'destination') }
  ];

  return (
    <div className={`animate-fade-in ${theme.bg} min-h-screen transition-colors duration-500 bg-pattern`}>
      
      {/* Hero Section with Slideshow */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-black">
        {heroContent.heroSlides.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover opacity-90" 
            />
            <div className={`absolute inset-0 flex flex-col items-center justify-center ${theme.heroOverlay} text-center px-4`}>
              <h1 className="text-white text-4xl md:text-6xl font-serif italic tracking-wider mb-4 whitespace-pre-line drop-shadow-lg animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm mb-8 animate-fade-in">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* CTA Button */}
        <div className="absolute bottom-16 left-0 w-full flex justify-center z-10">
          <button 
            onClick={() => onNavigate('list', 'destination')} 
            className="px-8 py-3 border border-white text-white uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition duration-300 backdrop-blur-sm"
          >
            Start Journey
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-3 z-10">
          {heroContent.heroSlides.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentSlide(idx)} 
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlide ? 'bg-white w-6' : 'bg-white/40'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Quick Category Access */}
        <div className="flex w-full max-w-4xl mx-auto my-10 h-24 gap-2">
          {quickCategories.map((item, idx) => (
            <div 
              key={idx} 
              onClick={item.action} 
              className={`relative group flex-1 hover:flex-[1.5] transition-all duration-500 ease-in-out flex flex-col items-center justify-center cursor-pointer ${theme.textMuted} hover:text-current rounded-lg border ${theme.border} hover:border-current overflow-hidden bg-white/30 backdrop-blur-sm`}
            >
              <div className="mb-2 transform group-hover:scale-110 transition-transform duration-500">
                <item.Icon size={24} strokeWidth={1} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.15em] opacity-70 group-hover:opacity-100 group-hover:font-bold transition-all whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Curator's Pick Section */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className={`text-2xl font-serif italic ${theme.text}`}>
              {heroContent.curatorsPick.title}
            </h2>
            <div className={`flex space-x-3 ${theme.text}`}>
              <ArrowRight 
                onClick={scrollLeft} 
                className="rotate-180 cursor-pointer opacity-50 hover:opacity-100 transition" 
              />
              <ArrowRight 
                onClick={scrollRight} 
                className="cursor-pointer hover:opacity-60 transition" 
              />
            </div>
          </div>
          
          {/* Scrollable Tour Cards */}
          <div 
            ref={scrollContainerRef} 
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
          >
            {featuredTours.map((tour) => (
              <HoverImageCard 
                key={tour.id}
                src={tour.image} 
                title={tour.title} 
                price={tour.price}
                currency={tour.currency}
                theme={theme}
                onClick={() => onTourSelect(tour)}
              />
            ))}
          </div>
        </div>

        {/* Category Tags Section - Continued in Part 2 */}
      </div>
    </div>
  );
};

export default HomeView;
