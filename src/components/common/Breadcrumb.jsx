import React from 'react';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ 
  breadcrumbs = [], 
  theme = {}, 
  onNavigate = () => {},
  onGoBack = () => {}
}) => {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-stone-200 py-3 mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Breadcrumb Path */}
        <div className="flex items-center gap-2 text-sm mb-2">
          {/* Home Link */}
          <button
            onClick={() => onNavigate('home')}
            className="text-stone-600 hover:text-stone-900 font-medium transition-colors"
          >
            Home
          </button>

          {/* Breadcrumb Items */}
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-stone-400" />
              
              {/* Current or clickable item */}
              {idx === breadcrumbs.length - 1 ? (
                // Last item (current page) - not clickable
                <span className="text-stone-900 font-semibold">
                  {crumb.label}
                </span>
              ) : (
                // Previous items - clickable
                <button
                  onClick={() => {
                    if (crumb.action === 'navigate') {
                      // 如果 crumb.view 是 'category'，需要传递正确的类型
                      if (crumb.view === 'category') {
                        onNavigate(crumb.params?.categoryType || 'cruise');
                      } else if (crumb.view === 'list') {
                        onNavigate('list', crumb.params?.listType || 'destination');
                      } else {
                        onNavigate(crumb.view);
                      }
                    } else if (crumb.action === 'goBack') {
                      onGoBack(crumb.step);
                    }
                  }}
                  className="text-stone-600 hover:text-stone-900 font-medium transition-colors"
                >
                  {crumb.label}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onGoBack(1)}
            className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ChevronRight className="w-3 h-3 rotate-180" />
            Back
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;