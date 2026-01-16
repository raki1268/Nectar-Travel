import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { tourDetailsMap } from '../../data/tourDetailsMap';
import { themeConfig } from '../../config/themeConfig';

const DetailView = ({ selectedTour }) => {
  const theme = themeConfig.theme;
  
  // 获取 tour id，优先使用 selectedTour 的 id
  const tourId = selectedTour?.id || 1;
  const baseData = selectedTour || {};
  const detailData = tourDetailsMap[tourId] || tourDetailsMap[1] || {};
  const tour = { ...baseData, ...detailData };

  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [hotelCarouselIdx, setHotelCarouselIdx] = useState(0);
  const scrollTimeoutRef = useRef(null);
  const idleTimeoutRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const resetIdleTimer = () => {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        if (!isScrolling) {
          setShowFloatingBar(true);
        }
      }, 3000);
    };

    resetIdleTimer();
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer);

    return () => {
      clearTimeout(idleTimeoutRef.current);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
    };
  }, [isScrolling]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      setShowFloatingBar(false);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // 初始化地图
  useEffect(() => {
    if (!tour.itinerary || tour.itinerary.length === 0) return;

    // 动态加载 Leaflet
    if (!window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (!mapRef.current || mapInstanceRef.current) return;

      const coordinates = tour.itinerary
        .filter(item => item.location)
        .map(item => {
          // 模拟坐标，实际应该使用真实坐标
          const coordMap = {
            'Toronto': [43.6532, -79.3832],
            'Niagara Falls': [43.0896, -79.0849],
            'Ottawa': [45.4215, -75.6972],
            'Montreal': [45.5017, -73.5673],
            'Quebec City': [46.8139, -71.2080]
          };
          return coordMap[item.location] || [45.5, -74.5];
        });

      const map = window.L.map(mapRef.current).setView(coordinates[0] || [45.5, -74.5], 6);

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // 添加标记
      const markers = [];
      tour.itinerary.forEach((item, idx) => {
        const coordMap = {
          'Toronto': [43.6532, -79.3832],
          'Niagara Falls': [43.0896, -79.0849],
          'Ottawa': [45.4215, -75.6972],
          'Montreal': [45.5017, -73.5673],
          'Quebec City': [46.8139, -71.2080]
        };
        const coords = coordMap[item.location] || [45.5, -74.5];

        const isVisited = idx <= activeDay;
        const marker = window.L.circleMarker(coords, {
          radius: 8,
          fillColor: isVisited ? '#1c1917' : '#ffffff',
          color: '#1c1917',
          weight: 2,
          opacity: 1,
          fillOpacity: isVisited ? 1 : 0.5
        })
          .bindPopup(`<strong>${item.location}</strong><br/>Day ${item.day}`)
          .addTo(map);

        markers.push({ marker, idx });
      });

      // 绘制路线
      const coords = tour.itinerary
        .filter(item => item.location)
        .map(item => {
          const coordMap = {
            'Toronto': [43.6532, -79.3832],
            'Niagara Falls': [43.0896, -79.0849],
            'Ottawa': [45.4215, -75.6972],
            'Montreal': [45.5017, -73.5673],
            'Quebec City': [46.8139, -71.2080]
          };
          return coordMap[item.location] || [45.5, -74.5];
        });

      if (coords.length > 1) {
        window.L.polyline(coords, {
          color: '#1c1917',
          weight: 2,
          opacity: 0.6
        }).addTo(map);
      }

      mapInstanceRef.current = { map, markers };
    }
  }, [tour.itinerary, activeDay]);

  // 当 activeDay 改变时更新地图标记
  useEffect(() => {
    if (mapInstanceRef.current) {
      const { markers } = mapInstanceRef.current;
      markers.forEach(({ marker, idx }) => {
        const isVisited = idx <= activeDay;
        marker.setStyle({
          fillColor: isVisited ? '#1c1917' : '#ffffff',
          fillOpacity: isVisited ? 1 : 0.5
        });
      });
    }
  }, [activeDay]);

  // 安全检查并兼容数据结构（在所有 hooks 之后）
  if (!tour || !tour.heroImages || !Array.isArray(tour.heroImages) || tour.heroImages.length === 0) {
    return <div className="p-8 text-center text-red-600">
      <p>错误：无法加载旅游数据</p>
      <p className="text-xs mt-2">{JSON.stringify(Object.keys(tour))}</p>
    </div>;
  }

  const nextHeroImage = () => {
    setCurrentHeroIdx((prev) => (prev + 1) % tour.heroImages.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroIdx((prev) => (prev - 1 + tour.heroImages.length) % tour.heroImages.length);
  };

  const nextGallery = () => {
    const maxIdx = Math.max(0, tour.galleryImages.length - 5);
    setCurrentGalleryIdx((prev) => (prev + 1 > maxIdx ? maxIdx : prev + 1));
  };

  const prevGallery = () => {
    setCurrentGalleryIdx((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  };

  return (
    <div className={`${theme.bg} min-h-screen`}>
      
      {/* A板块 */}
      <div>
        <div className="bg-stone-50 pt-16 pb-8 md:pt-20 md:pb-10">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <span className="text-stone-600 text-xs uppercase tracking-[0.3em] mb-3 block font-light">
              {tour.category} · {tour.season}
            </span>
            <h1 className="text-stone-900 text-4xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
              {tour.title}
            </h1>
            <div className="flex items-baseline gap-6 flex-wrap">
              <div>
                <span className="text-stone-600 text-xs uppercase tracking-wider block mb-1">From</span>
                <span className="text-stone-900 text-3xl md:text-4xl font-light">
                  {tour.currency === 'CNY' ? '¥' : '$'}{tour.price.toLocaleString()}
                </span>
                <span className="text-stone-600 text-sm ml-2">per person</span>
              </div>
              <div className="h-12 w-px bg-stone-300 hidden md:block" />
              <div>
                <span className="text-stone-600 text-xs uppercase tracking-wider block mb-1">Duration</span>
                <span className="text-stone-900 text-2xl font-light">{tour.days} Days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[75vh] w-full overflow-hidden">
          <img src={tour.heroImages[currentHeroIdx]} alt="hero" className="w-full h-full object-cover" />
          <button onClick={prevHeroImage} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button onClick={nextHeroImage} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-colors">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {tour.heroImages.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentHeroIdx(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === currentHeroIdx ? 'bg-white w-8' : 'bg-white/50'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* B板块 */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className={`text-2xl md:text-3xl font-serif mb-12 ${theme.text}`}>Destination Cities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {tour.destinations.map((dest, idx) => (
              <div key={idx} className="group overflow-hidden rounded-sm border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="relative h-40 overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <h3 className={`text-lg font-serif ${theme.text} mb-1`}>{dest.name}</h3>
                  <p className={`text-sm ${theme.textMuted}`}>Day {dest.days}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* C板块 */}
      <div className="bg-stone-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className={`text-2xl md:text-3xl font-serif mb-12 ${theme.text}`}>Journey Introduction</h2>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <p className={`${theme.textMuted} leading-relaxed text-lg mb-6`}>{tour.introduction}</p>
            </div>
            <div className="lg:w-1/2">
              <img src={tour.introductionImage} alt="introduction" className="w-full h-[267px] object-cover rounded-sm shadow-lg" />
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-200">
            <p className={`${theme.textMuted} leading-relaxed text-base`}>
              这个精心设计的行程汇集了加拿大东部最具代表性的城市和景点。从世界级的尼亚加拉瀑布到充满艺术气息的蒙特利尔，从政治中心渥太华到历史名城魁北克，每一站都提供独特的文化体验和自然美景。我们的专业团队确保您在每个目的地都能深入体验当地文化，品尝道地美食，并入住精选的高级酒店。这不仅仅是一次旅游，更是对加拿大这个多元化国家的深度探索和认识。无论是户外爱好者、文化寻求者还是美食家，这个行程都能满足您的期待，留下终生难忘的回忆。
            </p>
          </div>
        </div>
      </div>

      {/* Experience Highlights */}
      {tour.highlights && tour.highlights.length > 0 && (
        <div className="bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <h2 className={`text-2xl md:text-3xl font-serif mb-10 ${theme.text}`}>Experience Highlights</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tour.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className={`w-1.5 h-1.5 rounded-full ${theme.accent} mt-2 group-hover:scale-150 transition-transform flex-shrink-0`} />
                  <p className={`${theme.textMuted} leading-relaxed`}>{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gallery */}
      <div className="bg-stone-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className={`text-2xl md:text-3xl font-serif mb-12 ${theme.text}`}>Experience Gallery</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex gap-4 transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentGalleryIdx * (100 / 5)}%)` }}>
                {tour.galleryImages.map((img, idx) => (
                  <div key={idx} className="flex-shrink-0 w-1/5">
                    <img src={img} alt={`gallery-${idx}`} className="w-full h-64 object-cover rounded-sm cursor-pointer hover:opacity-80 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={prevGallery} disabled={currentGalleryIdx === 0} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 p-2 rounded-full transition-colors text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextGallery} disabled={currentGalleryIdx >= tour.galleryImages.length - 5} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 p-2 rounded-full transition-colors text-white">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.max(1, tour.galleryImages.length - 4) }).map((_, idx) => (
              <button key={idx} onClick={() => setCurrentGalleryIdx(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === currentGalleryIdx ? 'bg-stone-900 w-8' : 'bg-stone-300'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* D板块: Guide */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg">
            <img src={tour.guide.avatar} alt={tour.guide.name} className="w-full h-full object-cover" />
          </div>
          <h3 className={`text-2xl font-serif ${theme.text} mb-4`}>{tour.guide.name}</h3>
          <p className={`${theme.textMuted} max-w-2xl leading-relaxed`}>{tour.guide.intro}</p>
        </div>
      </div>

      {/* E板块: Team */}
      <div className="bg-stone-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/2">
              <img src={tour.teamInfo.image} alt="team" className="w-full h-96 object-cover rounded-sm shadow-lg" />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-8 uppercase tracking-wide">Our Team Could Bring</h2>
              <p className={`${theme.textMuted} leading-relaxed text-base`}>{tour.teamInfo.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* F板块: CTA */}
      <div className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif">Ready to Travel !</h2>
          <button className="bg-white text-stone-900 px-10 py-4 font-semibold uppercase tracking-wider hover:bg-stone-100 transition-colors whitespace-nowrap">
            Start Plan
          </button>
        </div>
      </div>

      {/* G板块: Itinerary */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className={`text-2xl md:text-3xl font-serif mb-12 ${theme.text}`}>Your Detailed Journey</h2>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Map - Sticky */}
            <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-24">
                <div 
                  id="tour-map"
                  className="w-full h-[500px] rounded-sm border border-stone-300 shadow-lg"
                />
              </div>
            </div>

            {/* Itinerary & Hotels - Scrollable */}
            <div className="lg:w-2/3">
              <div className="space-y-8">
                {tour.itinerary && tour.itinerary.map((item, idx) => (
                  <div key={idx}>
                    {/* Day Card */}
                    <div 
                      className="cursor-pointer group mb-6" 
                      onClick={() => setActiveDay(idx)}
                    >
                      <div className={`flex items-start gap-4 p-4 border border-stone-200 rounded-sm hover:shadow-lg transition-shadow ${activeDay === idx ? 'bg-stone-900' : 'bg-stone-50'}`}>
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold transition-colors ${activeDay === idx ? 'bg-white text-stone-900' : 'bg-stone-200 text-stone-900'}`}>
                          {item.day}
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-serif mb-2 ${activeDay === idx ? 'text-white' : theme.text}`}>{item.location}</h3>
                          <p className={`text-sm leading-relaxed ${activeDay === idx ? 'text-stone-100' : theme.textMuted}`}>{item.description}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <img src={item.image} alt={item.location} className="w-full h-48 object-cover rounded-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hotel Carousel */}
              {tour.itinerary && tour.itinerary.length > 0 && (
                <div className="mt-12 pt-8 border-t border-stone-200">
                  <h3 className={`text-xl font-serif ${theme.text} mb-8`}>Recommended Hotels</h3>
                  
                  {/* Hotels Grid */}
                  <div className="relative">
                    <div className="overflow-hidden">
                      <div 
                        className="flex gap-6 transition-transform duration-500 ease-out"
                        style={{
                          transform: `translateX(-${hotelCarouselIdx * (100 / 2)}%)`
                        }}
                      >
                        {tour.itinerary.map((item, idx) => (
                          <div key={idx} className="flex-shrink-0 w-1/2">
                            <div className="p-5 border border-stone-200 rounded-sm bg-white hover:shadow-lg transition-shadow h-full">
                              <p className="text-xs uppercase tracking-widest text-amber-600 font-semibold mb-2">Hotel</p>
                              <h4 className={`text-base font-serif ${theme.text} mb-2 line-clamp-2`}>{item.hotel.name}</h4>
                              <p className="text-xs text-stone-500 mb-3">{item.hotel.city}</p>
                              <p className={`text-xs ${theme.textMuted} leading-relaxed line-clamp-3`}>{item.hotel.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hotel Carousel Controls */}
                    {Math.ceil(tour.itinerary.length / 2) > 1 && (
                      <>
                        <button
                          onClick={() => setHotelCarouselIdx(Math.max(0, hotelCarouselIdx - 1))}
                          disabled={hotelCarouselIdx === 0}
                          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 p-2 rounded-full transition-colors text-white"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setHotelCarouselIdx(Math.min(Math.ceil(tour.itinerary.length / 2) - 1, hotelCarouselIdx + 1))}
                          disabled={hotelCarouselIdx >= Math.ceil(tour.itinerary.length / 2) - 1}
                          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 p-2 rounded-full transition-colors text-white"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Hotel Carousel Indicators */}
                  {Math.ceil(tour.itinerary.length / 2) > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                      {Array.from({ length: Math.ceil(tour.itinerary.length / 2) }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setHotelCarouselIdx(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === hotelCarouselIdx ? 'bg-stone-900 w-8' : 'bg-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      <div className="bg-stone-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className={`text-2xl md:text-3xl font-serif mb-12 ${theme.text}`}>Related Tours</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tour.relatedTours.map((relTour) => (
              <div key={relTour.id} className="border border-stone-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                  <div className="text-stone-500 text-sm">Tour Image</div>
                </div>
                <div className="p-6">
                  <h3 className={`text-lg font-serif ${theme.text} mb-3`}>{relTour.title}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-sm ${theme.textMuted}`}>{relTour.days} Days</span>
                    <span className={`text-xl font-light ${theme.text}`}>${relTour.price.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-stone-900 text-white py-2 text-sm uppercase tracking-wider hover:bg-stone-800 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Policy */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <h2 className={`text-2xl md:text-3xl font-serif mb-12 ${theme.text}`}>Booking Policy</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className={`text-xl font-serif ${theme.text} mb-6`}>Cancellation Policy</h3>
              <div className="space-y-4">
                {tour.bookingPolicy.cancellation.map((policy, idx) => (
                  <div key={idx} className="border-l-4 border-stone-900 pl-4">
                    <p className={`text-sm font-semibold ${theme.text} mb-1`}>{policy.days}</p>
                    <p className={`text-sm ${theme.textMuted}`}>{policy.refund}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`text-xl font-serif ${theme.text} mb-6`}>Payment Methods</h3>
              <div className="space-y-4">
                {tour.bookingPolicy.payment.map((payment, idx) => (
                  <div key={idx} className="border-l-4 border-stone-900 pl-4">
                    <p className={`text-sm font-semibold ${theme.text} mb-1`}>{payment.method}</p>
                    <p className={`text-sm ${theme.textMuted}`}>{payment.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-40" />

      {/* Floating Bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-2xl transition-transform duration-500 z-50 ${showFloatingBar && !isScrolling ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <h3 className="font-serif text-lg md:text-xl text-stone-900 mb-1">{tour.title}</h3>
            <p className="text-sm text-stone-600">{tour.days} Days · {tour.category}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-xs text-stone-500 uppercase tracking-wider block">From</span>
              <span className="text-2xl md:text-3xl font-light text-stone-900">${tour.price.toLocaleString()}</span>
              <span className="text-sm text-stone-600 ml-1">pp</span>
            </div>
            <button className="bg-stone-900 text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-stone-800 transition-colors whitespace-nowrap">
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;