import React from 'react';
import { UserCheck, XCircle } from 'lucide-react';
import contentData from '../../data/content.json';

const MembershipModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const membershipContent = contentData.modals.membership;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Welcome to the Inner Circle! Check your email.');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-[#fffbf0] p-8 md:p-10 max-w-md w-full rounded-sm shadow-2xl relative border border-gray-200 max-h-[80vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
        >
          <XCircle size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <UserCheck size={40} className="mx-auto mb-4 text-gray-700" strokeWidth={1} />
          <h3 className="text-3xl font-serif italic mb-2 text-gray-900">
            {membershipContent.title}
          </h3>
          <p className="text-xs uppercase tracking-widest text-gray-500">
            {membershipContent.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-gray-600 leading-loose font-light">
          <p>{membershipContent.description}</p>
          
          <ul className="list-disc pl-5 space-y-2">
            {membershipContent.benefits.map((benefit, index) => (
              <li key={index}>
                <strong>{benefit.title}:</strong> {benefit.description}
              </li>
            ))}
          </ul>
          
          <p>{membershipContent.footnote}</p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              required 
              placeholder="traveler@example.com" 
              className="w-full bg-white border border-gray-200 p-3 text-sm focus:outline-none focus:border-black transition" 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition"
          >
            Join & Unlock 10% Off
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <span 
            onClick={onClose} 
            className="text-[10px] text-gray-400 underline cursor-pointer hover:text-black"
          >
            No thanks, I'll explore first
          </span>
        </div>
      </div>
    </div>
  );
};

export default MembershipModal;