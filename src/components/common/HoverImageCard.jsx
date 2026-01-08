import React from 'react';

const HoverImageCard = ({ title, image, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="relative overflow-hidden rounded-lg cursor-pointer group"
    >
      <div className="aspect-video bg-gray-200 w-full overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">无图片</div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/30 flex items-end p-4">
        <h3 className="text-white font-bold">{title || '未命名目的地'}</h3>
      </div>
    </div>
  );
};

export default HoverImageCard;