import React from 'react';

const ListView = ({ theme, listType, onTourSelect }) => {
  return (
    <div className={`py-20 px-6 ${theme?.bg || 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold mb-8 ${theme?.text || 'text-gray-900'}`}>
          {listType === 'destination' ? '目的地列表' : '旅游线路'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <p className={theme?.text}>正在加载内容...</p>
        </div>
      </div>
    </div>
  );
};

export default ListView;