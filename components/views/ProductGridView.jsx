import React from 'react';
import { MapPin, Star, Heart } from 'lucide-react';

// Helper function to generate mock products
const generateGridProducts = (category, count = 20) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    title: `${category} Experience Package ${i + 1}`,
    location: category === 'Japan' ? 'Tokyo, Japan' : 'Global',
    rating: (4.5 + Math.random() * 0.5).toFixed(1),
    reviews: Math.floor(Math.random() * 500) + 10,
    price: Math.floor(Math.random() * 1000) + 200,
    image: `https://picsum.photos/400/300?random=${i}-${category}`,
    tag: i % 3 === 0 ? 'Instant Confirmation' : 'Best Seller',
    link: 'https://www.kkday.com/en'
  }));
};

const ProductGridView = ({ theme, gridTitle, onNavigate }) => {
  const gridItems = generateGridProducts(gridTitle, 20);

  const handleProductClick = (link) => {
    alert(`Redirecting to partner site: ${link}`);
  };

  return (
    <div className={`animate-fade-in ${theme.bg} min-h-screen bg-pattern pt-12 pb-20`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        
        {/* Breadcrumb */}
        <div className={`flex items-center gap-2 text-xs uppercase tracking-widest ${theme.textMuted} mb-6`}>
          <span 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer hover:text-black transition"
          >
            Home
          </span> 
          <span>/</span> 
          <span className={`${theme.text} font-bold`}>{gridTitle}</span>
        </div>

        {/* Page Title */}
        <h1 className={`text-2xl md:text-3xl font-serif italic mb-8 ${theme.text}`}>
          {gridTitle} Selection
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {gridItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleProductClick(item.link)} 
              className="bg-white group cursor-pointer rounded-md overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Product Image */}
              <div className="relative h-36 md:h-40 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                />
                
                {/* Tag Badge */}
                {item.tag && (
                  <div className="absolute top-0 left-0 bg-[#FF5722] text-white text-[9px] md:text-[10px] font-bold px-2 py-1 uppercase">
                    {item.tag}
                  </div>
                )}

                {/* Wishlist Icon */}
                <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-gray-400 hover:text-red-500 transition">
                  <Heart size={12} className="md:w-4 md:h-4" />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-xs md:text-sm font-bold text-gray-800 leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>

                <div className="mt-auto space-y-2">
                  {/* Location */}
                  <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-gray-500">
                    <MapPin size={10} /> {item.location}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#FFB800]">
                      <Star size={10} fill="currentColor" />
                      <span className="text-xs font-bold ml-1 text-gray-700">
                        {item.rating}
                      </span>
                    </div>
                    <span className="text-[9px] md:text-[10px] text-gray-400">
                      ({item.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline justify-between pt-2 border-t border-gray-50">
                    <span className="text-[9px] md:text-[10px] text-gray-400 line-through">
                      ¥{Math.floor(item.price * 1.2)}
                    </span>
                    <div className="text-base md:text-lg font-bold text-gray-900">
                      <span className="text-[10px] md:text-xs font-normal mr-[1px]">¥</span>
                      {item.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className="mt-12 text-center">
          <button 
            className={`px-8 py-3 border ${theme.border} ${theme.text} hover:bg-black hover:text-white transition text-xs uppercase tracking-widest`}
          >
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGridView;