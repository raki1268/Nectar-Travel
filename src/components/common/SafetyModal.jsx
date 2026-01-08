import React from 'react';

const SafetyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-black">安全须知</h2>
        <p className="text-gray-600 mb-6">这里是 Nectar Travel 的安全旅行指南内容...</p>
        <button 
          onClick={onClose}
          className="w-full py-2 bg-blue-600 text-white rounded-md"
        >
          关闭
        </button>
      </div>
    </div>
  );
};

export default SafetyModal;