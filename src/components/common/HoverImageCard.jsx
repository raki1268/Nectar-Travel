import React from 'react';

const HoverImageCard = ({ title, src, price, currency, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="relative overflow-hidden rounded-sm cursor-pointer group w-full bg-gray-100"
    >
      {/* 调整后的比例，高度约为宽度的 56%，符合增加 1/5 后的视觉比例 */}
      <div className="aspect-[16/12] w-full overflow-hidden">
       {src ? (
          <img 
            src={src} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            onError={(e) => {
              console.error("图片加载失败，请检查路径:", src);
              e.target.style.display = 'none'; // 加载失败时隐藏破损图标
            }}
     />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">无路径数据</div>
        )}
      </div>

      {/* 渐变遮罩层 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
        
        {/* 文字悬浮位移动画：group-hover 触发向上平滑位移 */}
        <div className="transform transition-all duration-500 ease-out group-hover:-translate-y-3">
          <h3 className="text-white font-serif italic text-lg md:text-xl mb-1 drop-shadow-md">
            {title}
          </h3>
          
          <p className="text-white/70 text-[10px] uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity duration-500">
            From {currency} {price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HoverImageCard;