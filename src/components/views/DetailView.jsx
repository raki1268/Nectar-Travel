// ============================================
// 旅游产品详情页（重要）
// ============================================

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTourDetails } from '../../data/tourDetailsMap';
import { hotels } from '../../data/hotels';
import { themeConfig } from '../../config/themeConfig';

const DetailView = ({ selectedTour }) => {
  const theme = themeConfig.theme;
  
  // 获取 tour id，优先使用 selectedTour 的 id
  const tourId = selectedTour?.id || 1;
  const baseData = selectedTour || {};
  
  // 使用新的 getTourDetails 函数获取完整数据
  const detailData = getTourDetails(tourId) || {};
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
    if (!tour.itinerary || tour.itinerary.length === 0 || !window.L) return;

    setTimeout(() => {
      if (!mapRef.current || mapInstanceRef.current) return;

      try {
        const coordMap = {
          'toronto': [43.6532, -79.3832],
          'niagaraFalls': [43.0896, -79.0849],
          'ottawa': [45.4215, -75.6972],
          'montreal': [45.5017, -73.5673],
          'quebecCity': [46.8139, -71.2080],
          'milan': [45.4642, 9.1900],
          'dolomites': [46.4108, 11.8860],
          'venice': [45.4408, 12.3155],
          'florence': [43.7696, 11.2558],
          'amalfiCoast': [40.6333, 14.6029],
          'rome': [41.9028, 12.4964]
        };

        const coordinates = tour.itinerary
          .map(item => coordMap[item.city?.id] || [45.5, -74.5]);

        const map = window.L.map(mapRef.current).setView(coordinates[0], 6);

        window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap, © CartoDB',
          maxZoom: 19
        }).addTo(map);

        const markers = [];
        tour.itinerary.forEach((item, idx) => {
          const coords = coordMap[item.city?.id] || [45.5, -74.5];
          const isVisited = idx <= activeDay;

          const marker = window.L.circleMarker(coords, {
            radius: 8,
            fillColor: isVisited ? '#1c1917' : '#ffffff',
            color: '#1c1917',
            weight: 2,
            opacity: 1,
            fillOpacity: isVisited ? 1 : 0.5
          })
            .bindPopup(`<strong>${item.city?.name}</strong><br/>Day ${item.day}`)
            .addTo(map);

          markers.push({ marker, idx });
        });

        if (coordinates.length > 1) {
          window.L.polyline(coordinates, {
            color: '#1c1917',
            weight: 2,
            opacity: 0.6
          }).addTo(map);
        }

        mapInstanceRef.current = { map, markers };
      } catch (error) {
        console.error('Map initialization error:', error);
      }
    }, 100);
  }, [tour.itinerary, activeDay]);

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

  // 安全检查
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
      {tour.guide && (
        <div className="bg-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg">
              <img src={tour.guide.avatar} alt={tour.guide.name} className="w-full h-full object-cover" />
            </div>
            <h3 className={`text-2xl font-serif ${theme.text} mb-4`}>{tour.guide.name}</h3>
            <p className={`${theme.textMuted} max-w-2xl leading-relaxed`}>{tour.guide.intro}</p>
          </div>
        </div>
      )}

      {/* E板块: Team */}
      {tour.teamInfo && (
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
      )}

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
                  ref={mapRef}
                  className="w-full h-[500px] rounded-sm border border-stone-300 shadow-lg"
                  style={{ minHeight: '500px' }}
                />
              </div>
            </div>

            {/* Itinerary & Hotels - Scrollable */}
            <div className="lg:w-2/3">
              <div className="space-y-12">
                {tour.itinerary && tour.itinerary.map((item, idx) => (
                  <div key={idx}>
                    {/* Day Card */}
                    <div 
                      className="cursor-pointer group mb-8" 
                      onClick={() => setActiveDay(idx)}
                    >
                      <div className={`flex items-start gap-4 p-4 border border-stone-200 rounded-sm hover:shadow-lg transition-shadow ${activeDay === idx ? 'bg-stone-900' : 'bg-stone-50'}`}>
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold text-xs transition-colors ${activeDay === idx ? 'bg-white text-stone-900' : 'bg-stone-200 text-stone-900'}`}>
                          Day {item.day}
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-serif mb-2 ${activeDay === idx ? 'text-white' : theme.text}`}>{item.city?.name}</h3>
                          <p className={`text-sm leading-relaxed ${activeDay === idx ? 'text-stone-100' : theme.textMuted}`}>{item.city?.description}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <img src={item.city?.image} alt={item.city?.name} className="w-full h-48 object-cover rounded-sm" />
                      </div>
                    </div>

                    {/* City Introduction */}
                    <div className="mb-8 p-6 border border-stone-200 rounded-sm bg-white">
                      <h4 className={`text-2xl font-serif ${theme.text} mb-4`}>{item.city?.name}</h4>
                      <p className={`${theme.textMuted} leading-relaxed text-sm`}>
                        Discover world-class attractions and iconic landmarks that define this vibrant destination. From historic architecture to modern cultural hubs, experience the perfect blend of tradition and innovation. Immerse yourself in local cuisine, art galleries, and unforgettable moments that will stay with you forever.
                      </p>
                    </div>

                    {/* Hotel Recommendation Section - 2 column carousel */}
                    {item.hotel && (() => {
                      // 获取该城市的所有酒店
                      const cityHotels = Object.values(hotels)
                        .filter(h => h.cityId === item.city?.id);

                      if (cityHotels.length === 0) return null;

                      // 计算总页数（每页显示2个）
                      const totalPages = Math.ceil(cityHotels.length / 2);
                      
                      return (
                        <div className="mb-12">
                          <h4 className={`text-2xl md:text-3xl font-serif ${theme.text} mb-8`}>Where you could stay</h4>
                          
                          {/* Hotel Cards - 2 columns */}
                          <div className="relative">
                            <div className="overflow-hidden">
                              <div 
                                className="flex gap-8 transition-transform duration-500 ease-out"
                                style={{
                                  transform: `translateX(-${hotelCarouselIdx * 100}%)`
                                }}
                              >
                                {/* Generate pairs of hotels */}
                                {Array.from({ length: totalPages }).map((_, pageIdx) => (
                                  <div key={pageIdx} className="flex-shrink-0 w-full flex gap-8">
                                    {[0, 1].map((offset) => {
                                      const hotelIdx = pageIdx * 2 + offset;
                                      const hotel = cityHotels[hotelIdx];
                                      
                                      return (
                                        <div key={hotelIdx} className="flex-1">
                                          {hotel ? (
                                            <div className="bg-white rounded-sm overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                                              {/* Image */}
                                              <div className="h-64 overflow-hidden bg-stone-200">
                                                <img 
                                                  src={item.city?.image}
                                                  alt={hotel.name}
                                                  className="w-full h-full object-cover"
                                                />
                                              </div>
                                              {/* Text Content */}
                                              <div className="p-6 flex flex-col flex-1">
                                                <p className={`text-sm font-serif ${theme.text} opacity-60 mb-2`}>{item.city?.name}</p>
                                                <h5 className={`text-2xl font-serif ${theme.text} mb-4`}>{hotel.name}</h5>
                                                <p className={`${theme.textMuted} leading-relaxed text-sm flex-1`}>{hotel.description}</p>
                                              </div>
                                            </div>
                                          ) : (
                                            <div /> // Empty placeholder
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Navigation Buttons */}
                            {totalPages > 1 && (
                              <>
                                <button
                                  onClick={() => setHotelCarouselIdx(Math.max(0, hotelCarouselIdx - 1))}
                                  disabled={hotelCarouselIdx === 0}
                                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 z-20 bg-white border border-stone-300 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed p-3 rounded-full transition-all"
                                >
                                  <ChevronLeft className="w-6 h-6 text-stone-600" />
                                </button>
                                <button
                                  onClick={() => setHotelCarouselIdx(Math.min(totalPages - 1, hotelCarouselIdx + 1))}
                                  disabled={hotelCarouselIdx >= totalPages - 1}
                                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 z-20 bg-white border border-stone-300 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed p-3 rounded-full transition-all"
                                >
                                  <ChevronRight className="w-6 h-6 text-stone-600" />
                                </button>
                              </>
                            )}
                          </div>

                          {/* Indicators */}
                          {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                              {Array.from({ length: totalPages }).map((_, idx) => (
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
                      );
                    })()}
                  </div>
                ))}
              </div>
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
      {tour.bookingPolicy && (
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
      )}

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