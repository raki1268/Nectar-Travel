import React, { useState, useEffect, useRef } from 'react';
import { Anchor, MapPin, Ticket, Calendar, Hotel, ArrowRight } from 'lucide-react';
import HoverImageCard from '../common/HoverImageCard';
import contentData from '../../data/content.json';
import toursData from '../../data/tours.json';
import { continents } from '../../data/continents';

const HomeView = ({ theme, onNavigate, onTourSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredContinent, setHoveredContinent] = useState(null);
  const [isHoveredCruise, setIsHoveredCruise] = useState(false);
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

  const handleContinentClick = (continent) => {
    if (continent.status === 'active') {
      onNavigate('list', continent.id);
    }
  };

  const quickCategories = [
    { Icon: Anchor, label: 'Cruise', action: () => onNavigate('cruise') },
    { Icon: MapPin, label: 'Destination', action: () => onNavigate('list', 'destination') },
    { Icon: Ticket, label: 'Ticket', action: () => onNavigate('ticket') },
    { Icon: Calendar, label: 'Season', action: () => onNavigate('list', 'season') },
    { Icon: Hotel, label: 'Stay', action: () => onNavigate('stay') }
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

        {/* Curator's Pick Section */}
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
            
            <div 
              ref={scrollContainerRef} 
              className="flex gap-4 overflow-x-auto pb-10 scrollbar-hide scroll-smooth"
            >
              {featuredTours.map((tour) => (
                <div 
                  key={tour.id} 
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

        {/* Pick Your Next Trip Section */}
        <div className="mb-20 py-16">
          <div className="mb-16 flex justify-center">
            <div className="text-center">
              <h2 className={`text-2xl font-serif italic ${theme.text}`}>
                Your Next Trip
              </h2>
              <p className={`text-[10px] uppercase tracking-widest mt-2 ${theme.textMuted}`}>
                Explore destinations across the globe
              </p>
            </div>
          </div>

          {/* 横向网格容器 */}
          <div className="relative w-full h-64 flex justify-center px-8">
            {/* 背景横线 - 两端带实心圆点 */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-900 transform -translate-y-1/2">
              {/* 左端实心圆点 */}
              <div className="absolute -left-4 top-1/2 w-3 h-3 bg-gray-900 rounded-full transform -translate-y-1/2"></div>
              {/* 右端实心圆点 */}
              <div className="absolute -right-4 top-1/2 w-3 h-3 bg-gray-900 rounded-full transform -translate-y-1/2"></div>
            </div>

            {/* 大洲点容器 */}
            <div className="flex justify-between items-center h-full relative z-10 w-full">
              {continents.map((continent, idx) => (
                <div
                  key={continent.id}
                  className="flex flex-col items-center cursor-pointer group relative flex-1"
                  onMouseEnter={() => setHoveredContinent(continent.id)}
                  onMouseLeave={() => setHoveredContinent(null)}
                  onClick={() => handleContinentClick(continent)}
                >
                  {/* 活跃的大洲（亚洲、北美洲、欧洲）- 显示在上方 */}
                  {continent.status === 'active' && (
                    <div className={`absolute bottom-16 text-center transition-all duration-300 ${
                      hoveredContinent === continent.id ? 'scale-110' : 'scale-100'
                    }`}>
                      <p className={`text-l font-bold leading-tight ${
                        hoveredContinent === continent.id ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {continent.label}
                      </p>
                    </div>
                  )}

                  {/* 竖线 */}
                  <div
                    className={`absolute w-1 transition-all duration-300 ${
                      continent.status === 'active'
                        ? (hoveredContinent === continent.id ? 'h-10 bg-black bottom-full' : 'h-14 bg-black bottom-full')
                        : (hoveredContinent === continent.id ? 'h-10 bg-gray-400 top-0' : 'h-12 bg-gray-300 top-0')
                    }`}
                  ></div>

                  {/* 即将推出的大洲 - 显示在竖线上端 */}
                  {continent.status === 'coming-soon' && (
                    <div className={`absolute top-14 text-center transition-all duration-300 ${
                      hoveredContinent === continent.id ? 'scale-110' : 'scale-100'
                    }`}>
                      <p className={`text-sm leading-snug opacity-60 mb-2 ${
                        hoveredContinent === continent.id ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {continent.label}
                      </p>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400">
                        Coming Soon
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 底部描述 */}
          <div className="mt-20 text-center">
            <p className={`text-XL ${theme.textMuted}`}>
              Seek your own horizon, <br />
              Where every path whispers a new story, <br />
              Trace the map to unveil your next sanctuary.
            </p>
          </div>
        </div>

        {/* Cruise Banner Section */}
        <div className="mb-20">
          <div 
            className="relative h-80 rounded-lg overflow-hidden cursor-pointer group"
            onMouseEnter={() => setIsHoveredCruise(true)}
            onMouseLeave={() => setIsHoveredCruise(false)}
            onClick={() => onNavigate('cruise')}
          >
            {/* 背景图片 */}
            <img 
              src="images/hero/alaska.jpg" 
              alt="Explore Cruise" 
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHoveredCruise ? 'scale-105' : 'scale-100'
              }`}
            />
            
            {/* 深色叠加层 */}
            <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${
              isHoveredCruise ? 'opacity-30' : 'opacity-40'
            }`}></div>

            {/* 左上角文本 */}
            <div className="absolute top-8 left-8 z-10">
              <h3 className={`text-white text-2xl md:text-3xl font-serif italic transition-all duration-500 ${
                isHoveredCruise ? 'translate-x-2 text-white' : 'text-white/90'
              }`}>
                Explore Cruise
              </h3>
              <div className={`h-1 bg-white mt-3 transition-all duration-500 ${
                isHoveredCruise ? 'w-24' : 'w-16'
              }`}></div>
            </div>

            {/* 右下角箭头提示 */}
            <div className={`absolute bottom-6 right-6 text-white text-sm opacity-0 transition-opacity duration-500 ${
              isHoveredCruise ? 'opacity-100' : 'opacity-0'
            }`}>
              <p className="uppercase tracking-widest text-xs">Discover More →</p>
            </div>
          </div>
        </div>

        {/* ===== TESTIMONIALS SECTION (新增) ===== */}
        <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className={`text-3xl md:text-4xl font-serif italic ${theme.text}`}>
                  Guest Stories
                </h2>
                <p className={`text-xs uppercase tracking-widest mt-3 ${theme.textMuted}`}>
                  Hear from travelers who've experienced the Nectar difference
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: 1,
                  quote: "This was our 3rd trip with Nectar Travel - we are consistently impressed with the first step of the travel design process to the arrival at the departing airport where we reflect on our absolutely memorable trip.",
                  author: "Deborah Passey",
                  rating: 5,
                  date: "Published 09th January 2026 on Trustpilot"
                },
                {
                  id: 2,
                  quote: "The attention to detail from Nectar Travel was extraordinary. Every moment felt carefully curated. We couldn't have asked for a better experience exploring the hidden gems of Southeast Asia.",
                  author: "Margaret Chen",
                  rating: 5,
                  date: "Published 15th December 2025 on Trustpilot"
                },
                {
                  id: 3,
                  quote: "From the initial consultation to the final day of our journey with Nectar Travel, everything exceeded our expectations. Our guide was knowledgeable, passionate, and genuinely cared about our experience.",
                  author: "James Mitchell",
                  rating: 5,
                  date: "Published 22nd November 2025 on Trustpilot"
                }
              ].map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className={`${theme.bg} p-10 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border ${theme.border}`}
                >
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  
                  <p className={`${theme.text} leading-relaxed italic mb-6 text-sm min-h-24`}>
                    "{testimonial.quote}"
                  </p>
                  
                  <div className={`border-t ${theme.border} pt-4`}>
                    <p className={`font-semibold ${theme.text} text-sm`}>{testimonial.author}</p>
                    <p className={`text-xs ${theme.textMuted} mt-2`}>{testimonial.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHY CHOOSE US SECTION (新增) ===== */}
        <section className={`py-20 px-6 ${theme.bg}`}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-serif italic ${theme.text}`}>
                Why Book with Nectar?
              </h2>
              <p className={`text-xs uppercase tracking-widest mt-4 ${theme.textMuted}`}>
                What sets us apart
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: 'Original Experiences',
                  image: 'images/hero/whychooseus.jpg',
                  description: "We'll plan your trip around your personal interests and preferences. We get to know you first. So we can craft a luxury journey — and a story — that's uniquely yours."
                },
                {
                  title: 'The Personal Touch',
                  image: 'images/hero/whychooseus.jpg',
                  description: "Our destination specialists, expert guides and brilliant concierges are hand-picked for their ability to bring your destination to life with care and passion."
                },
                {
                  title: 'Responsible Travel',
                  image: 'images/hero/whychooseus.jpg',
                  description: "Guided by our Positive Impact Principles, we seek to ensure your trip can help preserve, support and regenerate culture, biodiversity and heritage."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-full h-48 mb-6 rounded-lg overflow-hidden bg-gray-200">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className={`text-xl font-serif italic ${theme.text} mb-4`}>
                    {item.title}
                  </h3>
                  <p className={`${theme.textMuted} leading-relaxed text-sm`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== START PLANNING CTA SECTION (新增) ===== */}
        <div className="py-16 bg-gray-800 mb-20 w-screen ml-[calc(-50vw+50%)]">
          <div className="text-center">
            <h2 className="text-4xl px-6 md:text-5xl font-serif italic text-white mb-6">
              Your Adventure Starts Now
            </h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed px-6">
              Whatever you want your luxury private tour or safari itinerary to include, we'll create something fully bespoke for you… and only you.
            </p>
            <button
              onClick={() => {
                alert('Plan Your Journey - Coming Soon');
              }}
              className="px-10 py-3 bg-purple-300 hover:bg-purple-400 text-gray-800 font-semibold rounded-full transition-all duration-300 uppercase text-sm tracking-wider"
            >
              Start Planning
            </button>
          </div>
        </div>

       {/* About Section */}
<section className="py-24 px-6 md:px-12 bg-[#F9F9F9]">
  <div className="max-w-4xl mx-auto text-center">
    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8">
      {aboutSection?.est || 'Est. 2024'}
    </p>
    
    <h2 
      className="text-4xl md:text-5xl font-serif italic text-gray-900 mb-10 cursor-pointer hover:opacity-70 transition-opacity"
      onClick={() => onNavigate('about')}
    >
      {aboutSection?.title || 'About Nectar Travel'}
    </h2>
    
    <div className="relative inline-block">
      <span className="absolute -left-8 -top-4 text-4xl text-gray-200 font-serif">"</span>
      <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light italic">
        我们所有团队成员长期居住于当地，致力于为您提供最真实的，安心的，有趣的，独家的旅行体验
      </p>
      <span className="absolute -right-8 -bottom-4 text-4xl text-gray-200 font-serif">"</span>
    </div>

    <div className="mt-16 flex justify-center">
      <img 
        src="images/hero/nectartravel.jpg" 
        alt="Nectar Travel Seal" 
        className="w-32 h-auto opacity-70 mix-blend-multiply grayscale hover:opacity-100 transition-opacity duration-700"
      />
    </div>

    {/* YouTube 视频嵌入 */}
    <div className="mt-16 w-full max-w-2xl mx-auto">
      <iframe
        width="100%"
        height="500"
        src="https://www.youtube.com/embed/2Fht9SJ3sSw"
        title="Nectar Travel Story"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg shadow-lg"
      ></iframe>
    </div>
  </div>
</section>

      </div>
    </div>
  );
};

export default HomeView;