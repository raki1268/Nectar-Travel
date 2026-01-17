// ============================================
// 首页
// ============================================

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Anchor, Palette, Ticket, Users, Tent } from 'lucide-react';
import HoverImageCard from '../common/HoverImageCard';
import contentData from '../../data/content.json';
import toursData from '../../data/tours.json';

const HomeView = ({ theme, onNavigate, onTourSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef(null);
  
  // 安全地获取首页内容
  const heroContent = contentData.homepage || {};
  const slides = heroContent.heroSlides || [];
  const curatorsPick = heroContent.curatorsPick || {};
  const aboutSection = heroContent.aboutSection || {};
  
  const featuredTours = toursData.tours.filter(tour => tour.featured);

  // 自动播放幻灯片
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // 滚动控制
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
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
      
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden bg-black">
        {slides.map((slide, index) => (
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

        {/* CTA & Indicators */}
        <div className="absolute bottom-16 left-0 w-full flex justify-center z-10">
          <button 
            onClick={() => onNavigate('list', 'destination')} 
            className="px-8 py-3 border border-white text-white uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition duration-300 backdrop-blur-sm"
          >
            Start Journey
          </button>
        </div>
        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-3 z-10">
          {slides.map((_, idx) => (
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

        {/* Curator's Pick Section - 修复并显示图框 */}
        {curatorsPick.title && (
          <div className="mb-20">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className={`text-2xl font-serif italic ${theme.text}`}>
                  {curatorsPick.title}
                </h2>
                <p className={`text-[10px] uppercase tracking-widest mt-2 ${theme.textMuted}`}>
                  {curatorsPick.subtitle}
                </p>
              </div>
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
            
            {/* 滚动容器：flex布局，禁止换行，允许横向滚动 */}
             <div 
               ref={scrollContainerRef} 
               className="flex gap-4 overflow-x-auto pb-10 scrollbar-hide scroll-smooth"
             >
               {featuredTours.map((tour) => (
                  <div 
                   key={tour.id} 
                   /* w-[25vw] 表示卡片占据视口宽度的 25%
                      min-w-[220px] 保证在小屏幕上不会缩得太小
                   */
                   className="min-w-[220px] w-[26vw] md:min-w-[250px] md:w-[26vw] flex-shrink-0"
                  >
                   <HoverImageCard 
                     src={tour.image} 
                     title={tour.title} 
                     price={tour.price}
                     currency={tour.currency}
                     theme={theme}
                     onClick={() => onTourSelect(tour)}
                   />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Section */}
<section className="py-24 px-6 md:px-12 bg-[#F9F9F9]">
  <div className="max-w-4xl mx-auto text-center">
    {/* 使用变量 aboutSection.est */}
    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8">
      {aboutSection?.est || 'Est. 2024'}
    </p>
    
    {/* 使用变量 aboutSection.title */}
    <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900 mb-10">
      {aboutSection?.title || 'About Nectar Travel'}
    </h2>
    
    <div className="relative inline-block">
      <span className="absolute -left-8 -top-4 text-4xl text-gray-200 font-serif">“</span>
      {/* 使用变量 aboutSection.quote */}
      <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light italic">
        {aboutSection?.quote || 'We do not sell tickets; we grant keys to the hidden doors of the world.'}
      </p>
      <span className="absolute -right-8 -bottom-4 text-4xl text-gray-200 font-serif">”</span>
    </div>

    {/* Logo 部分保持不变 */}
    <div className="mt-16 flex justify-center">
      <img 
        src="images/hero/nectartravel.jpg" 
        alt="Nectar Travel Seal" 
        className="w-32 h-auto opacity-70 mix-blend-multiply grayscale hover:opacity-100 transition-opacity duration-700"
      />
    </div>
  </div>
</section>

      </div>
    </div>
  );
};

export default HomeView;