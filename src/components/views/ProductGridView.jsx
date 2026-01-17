// ============================================
// 售票展示页
// ============================================

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Star, 
  ArrowRight,
  ChevronDown,
  Check,
  Quote
} from 'lucide-react';

const App = () => {
  const [currency, setCurrency] = useState('CAD');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [activeNav, setActiveNav] = useState('GLOBAL');
  const [editorIdx, setEditorIdx] = useState(0);
  const [expandedRegions, setExpandedRegions] = useState({});
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [products, setProducts] = useState({
    JAPAN: [],
    EUROPE: [],
    CANADA: [],
    USA: []
  });
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const navRef = useRef(null);
  const sectionRefs = {
    JAPAN: useRef(null),
    EUROPE: useRef(null),
    CANADA: useRef(null),
    USA: useRef(null),
  };

  // API 配置
  const API_CONFIG = {
    apiKey: 'YOUR_API_KEY_HERE',
    baseUrl: 'https://api.kkday.com/v3',
    cid: 'YOUR_CID_HERE',
    userName: 'YOUR_USERNAME_HERE'
  };

  const currencies = ['CAD', 'EUR', 'JPY', 'CNY', 'USD'];

  // 买手精选 ID 列表
  const myPicksIds = {
    JAPAN: [12345, 67890],
    EUROPE: [11111, 22222],
    CANADA: [33333, 44444],
    USA: [55555, 66666]
  };

  const heroSlides = [
    { title: "THE ART OF TRAVEL", subtitle: "DISCOVER THE WORLD'S BEST THEME PARKS", img: "images/ticketthemepark/hero-1.jpg" },
    { title: "NORDIC LIGHTS", subtitle: "FIND PEACE UNDER THE AURORA", img: "images/ticketthemepark/hero-1.jpg" }
  ];

  const editorPicks = Array.from({ length: 10 }).map((_, i) => ({
    id: `e${i+1}`,
    name: i === 0 ? "Niseko Grand Hirafu Ski Pass" : i === 1 ? "Private Louvre Museum Tour" : `Premium Selection ${i+1}`,
    price: 150 + i * 50,
    img: `images/ticketthemepark/hero-1.jpg`,
    tag: i < 3 ? `TOP ${i+1}` : 'PICK'
  }));

  // 监听滚动，控制导航栏固定
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navTop = navRef.current.offsetTop;
        const isFixed = window.scrollY >= navTop;
        setIsNavFixed(isFixed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // API 调用：获取产品信息
  const fetchProductsFromAPI = async (region) => {
    setLoading(true);
    try {
      const ids = myPicksIds[region] || [];
      if (ids.length === 0) {
        console.warn(`No product IDs configured for ${region}`);
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_CONFIG.baseUrl}/product/info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'x-api-key': API_CONFIG.apiKey
        },
        body: JSON.stringify({
          product_ids: ids
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      
      const productsData = data.data?.map(item => ({
        id: item.product_id,
        name: item.product_name,
        price: item.b2b_min_price || item.min_price,
        rating: item.rating || 4.8,
        img: item.prod_img_url || 'images/ticketthemepark/hero-1.jpg',
        productId: item.product_id
      })) || [];

      setProducts(prev => ({
        ...prev,
        [region]: productsData
      }));
    } catch (error) {
      console.error('Failed to fetch products:', error);
      const fallbackData = Array.from({ length: 8 }).map((_, i) => ({
        id: `${region}-${i}`,
        name: `${region} Experience ${i+1}`,
        price: 300 + i * 100,
        rating: 4.8 + Math.random() * 0.2,
        img: 'images/ticketthemepark/hero-1.jpg',
        productId: myPicksIds[region][i] || 0
      }));
      setProducts(prev => ({
        ...prev,
        [region]: fallbackData
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Object.keys(myPicksIds).forEach(region => {
      fetchProductsFromAPI(region);
    });
  }, []);

  const handleNavClick = (item) => {
    setActiveNav(item);
    if (item === 'GLOBAL') {
      window.scrollTo({ top: editorRef.current.offsetTop - 120, behavior: 'smooth' });
    } else {
      const target = sectionRefs[item].current;
      if (target) {
        window.scrollTo({ top: target.offsetTop - 120, behavior: 'smooth' });
      }
    }
  };

  const getConvertedPrice = (price) => {
    const rates = { CAD: 1, EUR: 0.68, JPY: 108, CNY: 5.2, USD: 0.74 };
    const symbol = { CAD: '$', EUR: '€', JPY: '¥', CNY: '¥', USD: '$' };
    return `${symbol[currency]} ${Math.floor(price * rates[currency]).toLocaleString()}`;
  };

  const generateAffiliateLink = (productId) => {
    return `https://www.kkday.com/product/${productId}?cid=${API_CONFIG.cid}&username=${API_CONFIG.userName}`;
  };

  const nextEditor = () => setEditorIdx(prev => (prev + 4 >= editorPicks.length ? 0 : prev + 4));
  const toggleRegion = (region) => setExpandedRegions(prev => ({ ...prev, [region]: !prev[region] }));

  const regionalData = products;

  return (
    <div className="min-h-screen bg-white text-neutral-900 pb-20 font-sans">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fade-in-up 0.8s ease-out forwards; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: white; }
        ::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 10px; }
        
        .nav-fixed {
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.15) 30%, rgba(255, 255, 255, 0.15) 70%, transparent) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
        }
        
        .glass-overlay {
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.15) 30%, rgba(91, 133, 248, 0.15) 70%, transparent) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
        }
      `}</style>
      
      {/* Header Placeholder */}
      <div className="h-20 bg-white border-b border-neutral-100" />

      {/* Hero Poster */}
      <div className="px-6 md:px-10">
        <div className="relative h-[65vh] rounded-[2rem] overflow-hidden bg-neutral-100 group shadow-lg">
          {heroSlides.map((slide, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeHeroIdx ? 'opacity-100' : 'opacity-0'}`}>
              <img src={slide.img} className="w-full h-full object-cover" alt="Hero" />
              <div className="absolute inset-0 bg-black/10 flex flex-col justify-center items-center text-center p-6">
                <p className="text-white/80 text-[10px] tracking-[0.6em] uppercase mb-4 font-bold drop-shadow-md">{slide.subtitle}</p>
                <h2 className="text-white text-6xl md:text-8xl font-thin tracking-tighter italic drop-shadow-xl">{slide.title}</h2>
              </div>
            </div>
          ))}
          <button onClick={() => setActiveHeroIdx(p => (p === 0 ? 1 : 0))} className="absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => setActiveHeroIdx(p => (p === 0 ? 1 : 0))} className="absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Glass Overlay Background */}
      {isNavFixed && (
        <div 
          className="glass-overlay fixed top-0 left-0 right-0 z-[98] pointer-events-none"
          style={{ height: '10px' }}
        />
      )}

      {/* Navigation */}
      <nav 
        ref={navRef}
        className={`${isNavFixed ? 'nav-fixed fixed left-0 right-0 z-[100] shadow-sm border-b border-white/10' : 'relative bg-white border-b border-neutral-100'} mt-12 transition-all duration-300`}
        style={isNavFixed ? { width: '100%', top: '20px' } : {}}
      >
        <div className="max-w-[1440px] mx-auto px-10 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            {['GLOBAL', 'JAPAN', 'EUROPE', 'CANADA', 'USA'].map(item => (
              <button 
                key={item} 
                onClick={() => handleNavClick(item)} 
                className={`text-[11px] font-black tracking-[0.2em] transition-all relative py-1 ${activeNav === item ? 'text-black' : 'text-neutral-300 hover:text-neutral-500'}`}
              >
                {item}
                {activeNav === item && <div className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-black" />}
              </button>
            ))}
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)} 
              className="flex items-center gap-3 px-5 py-2 border border-neutral-200 rounded-full hover:border-black transition-all bg-white shadow-sm"
            >
              <Globe size={14} className="text-neutral-400" />
              <span className="text-[10px] font-black tracking-widest">{currency}</span>
              <ChevronDown size={12} className={`transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showCurrencyDropdown && (
              <div className="absolute right-0 mt-3 w-32 bg-white border border-neutral-100 shadow-2xl rounded-xl p-1 z-[110] overflow-hidden">
                {currencies.map(curr => (
                  <button 
                    key={curr} 
                    onClick={() => { setCurrency(curr); setShowCurrencyDropdown(false); }} 
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-50 text-[10px] font-bold tracking-widest text-neutral-600 transition-colors"
                  >
                    {curr}
                    {currency === curr && <Check size={12} className="text-black" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {isNavFixed && <div className="h-20" />}

      <div className="max-w-[1440px] mx-auto px-10 mt-24">
        
        {/* Editor's Selection */}
        <section ref={editorRef} className="mb-40 scroll-mt-32">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-6xl font-thin tracking-tighter text-neutral-800 italic">Editor's Selection</h2>
              <p className="text-[10px] font-black tracking-[0.4em] text-neutral-300 mt-4 uppercase">Elite Curated Experiences</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={nextEditor} 
                className="p-5 border border-neutral-100 rounded-full hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-10">
            {editorPicks.slice(editorIdx, editorIdx + 4).map((p, idx) => (
              <div key={p.id} className="group relative">
                <div className={`relative aspect-[3/4] overflow-hidden rounded-xl transition-all duration-700 ${idx < 3 && editorIdx === 0 ? 'shadow-[0_25px_60px_rgba(212,175,55,0.2)]' : 'shadow-md'}`}>
                  <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  {idx < 3 && editorIdx === 0 && (
                    <div className="absolute top-0 left-0 bg-[#D4AF37] text-white text-[10px] font-black px-5 py-2.5 tracking-[0.2em] rounded-br-xl shadow-lg">
                      {p.tag}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="mt-8 space-y-2">
                  <h3 className="text-xl font-bold text-neutral-800 leading-tight">{p.name}</h3>
                  <p className="text-[15px] font-light text-neutral-400">From <span className="text-neutral-900 font-bold">{getConvertedPrice(p.price)}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products Area */}
        <div className="space-y-40">
          {Object.entries(regionalData).map(([region, productList]) => {
            if (activeNav !== 'GLOBAL' && activeNav !== region) return null;
            
            const displayProducts = productList.slice(0, 8);

            return (
              <section key={region} ref={sectionRefs[region]} className="animate-in scroll-mt-32">
                <div className="flex items-center justify-between mb-12 border-b border-neutral-100 pb-5">
                  <h2 className="text-2xl font-black tracking-[0.5em] text-neutral-900">{region}</h2>
                  {activeNav === 'GLOBAL' && productList.length > 0 && (
                    <button 
                      onClick={() => toggleRegion(region)}
                      className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-neutral-600 hover:text-neutral-900 transition-colors group"
                    >
                      View More
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
                
                {loading ? (
                  <div className="text-center py-20 text-neutral-400">Loading products...</div>
                ) : productList.length === 0 ? (
                  <div className="text-center py-20 text-neutral-400">No products configured. Please add product IDs to myPicksIds.</div>
                ) : (
                  <div className="grid grid-cols-4 gap-x-6 gap-y-10">
                    {displayProducts.map(product => (
                      <a 
                        key={product.id} 
                        href={generateAffiliateLink(product.productId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer"
                      >
                        <div className="relative aspect-square overflow-hidden bg-neutral-50 mb-5 rounded-lg shadow-sm">
                          <img src={product.img} className="w-full h-full object-cover group-hover:opacity-90 transition-all duration-500" />
                        </div>
                        <div className="space-y-2 px-1">
                          <h3 className="text-[13px] font-bold text-neutral-700 line-clamp-2 leading-tight uppercase tracking-tight">{product.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-medium text-neutral-500">{getConvertedPrice(product.price)}</span>
                            <div className="flex items-center text-[10px] text-neutral-400 font-bold">
                               <Star size={10} className="mr-1 fill-neutral-200 text-transparent" /> {product.rating?.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Customer Stories */}
        <section className="mt-64 py-32 border-y border-neutral-100 bg-neutral-50/30 rounded-[3rem]">
           <div className="text-center mb-20">
             <h2 className="text-4xl font-thin italic mb-4">Traveler Stories</h2>
             <div className="w-16 h-[1px] bg-neutral-900/10 mx-auto" />
           </div>
           <div className="grid grid-cols-3 gap-16 px-10">
             {[
                { name: "Da**el K.", date: "Oct 2023", content: "The private tour in Japan was beyond expectations. Seamless service and truly exclusive access." },
                { name: "Ma**ha S.", date: "Nov 2023", content: "Nectar Travel curated the perfect European honeymoon for us. Every detail was meticulously planned." },
                { name: "Ro**rt L.", date: "Dec 2023", content: "Best ski experience in Canada. The local insights from the editor's pick were invaluable." }
             ].map((r, i) => (
               <div key={i} className="flex flex-col items-center text-center">
                 <Quote className="text-neutral-200 mb-8" size={32} />
                 <p className="text-lg text-neutral-600 font-light italic leading-relaxed mb-10">"{r.content}"</p>
                 <div className="pt-4 border-t border-neutral-100 w-full">
                   <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-1">{r.name}</p>
                   <p className="text-[9px] text-neutral-400 font-bold uppercase">{r.date}</p>
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-40 text-center max-w-4xl mx-auto px-10 pb-20">
          <h2 className="text-5xl font-thin tracking-tighter italic mb-10">Why Nectar Travel?</h2>
          <div className="grid grid-cols-2 gap-16 text-left mb-16">
            <div className="space-y-4">
              <h4 className="text-[11px] font-black tracking-widest uppercase text-neutral-900">Expert Curation</h4>
              <p className="text-sm text-neutral-500 leading-loose">
                We don't aggregate; we curate. Every experience is hand-picked by our seasoned travel editors who have explored every corner of the globe to find the truly exceptional.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] font-black tracking-widest uppercase text-neutral-900">Seamless Luxury</h4>
              <p className="text-sm text-neutral-500 leading-loose">
                From exclusive access to world-class landmarks to private ski passes, we ensure your journey is effortless, elegant, and unforgettable.
              </p>
            </div>
          </div>
          <a 
            href="#" 
            className="inline-flex items-center gap-6 text-[11px] font-black tracking-[0.4em] uppercase py-4 px-12 bg-neutral-900 text-white hover:bg-neutral-800 transition-all rounded-full group shadow-xl"
          >
            Our Mission
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </section>

        {/* API Configuration Guide */}
        <div className="mt-20 p-8 bg-neutral-50 rounded-xl border border-neutral-200 text-sm text-neutral-600">
          <h3 className="font-bold text-neutral-900 mb-3">🔧 API 配置说明（需要填入以下信息）</h3>
          <ul className="space-y-2 text-xs">
            <li><code className="bg-white px-2 py-1 rounded">API_CONFIG.apiKey</code> - 你的 KKday API Key (x-api-key)</li>
            <li><code className="bg-white px-2 py-1 rounded">API_CONFIG.cid</code> - 你的联盟 CID</li>
            <li><code className="bg-white px-2 py-1 rounded">API_CONFIG.userName</code> - 你的用户名</li>
            <li><code className="bg-white px-2 py-1 rounded">myPicksIds</code> - 每个地区的产品 ID 数组（最多10个）</li>
            <li>获取信息后，直接修改代码中相应位置即可自动同步</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default App;