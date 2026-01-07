import React from 'react';
import contentData from '../../data/content.json';

const AboutView = ({ theme }) => {
  const aboutContent = contentData.about;

  return (
    <div className={`animate-fade-in ${theme.bg} min-h-screen pt-12 pb-20 bg-pattern`}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center mb-16">
        <h1 className={`text-3xl md:text-6xl font-serif italic mb-6 ${theme.text}`}>
          {aboutContent.title}
        </h1>
        <p className={`text-sm md:text-lg ${theme.textMuted} font-light`}>
          {aboutContent.subtitle}
        </p>
      </div>

      {/* Philosophy Section */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-20">
        
        {/* Image */}
        <div className="aspect-[4/5] overflow-hidden rounded-sm">
          <img 
            src={aboutContent.philosophy.image}
            alt="Our Philosophy" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-1000" 
          />
        </div>

        {/* Text Content */}
        <div className="space-y-6 md:space-y-8 text-left">
          <h2 className={`text-xl md:text-2xl font-serif ${theme.text}`}>
            {aboutContent.philosophy.title}
          </h2>
          <p className={`text-sm md:text-base leading-loose ${theme.textMuted}`}>
            {aboutContent.philosophy.content}
          </p>
          <p className={`text-sm md:text-base leading-loose ${theme.textMuted}`}>
            We believe that the most meaningful journeys are those that transform us. 
            Each destination we curate is selected not just for its beauty, but for its ability 
            to inspire wonder, foster connection, and create lasting memories.
          </p>
          <div className={`w-16 h-[1px] ${theme.text} bg-current opacity-20`} />
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 border-t border-b border-gray-200">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          
          <div className="text-center md:text-left">
            <h3 className={`text-lg font-serif mb-4 ${theme.text}`}>
              Curated Excellence
            </h3>
            <p className={`text-sm leading-relaxed ${theme.textMuted}`}>
              Every experience is handpicked by our team of travel connoisseurs, 
              ensuring authenticity and quality in every moment.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className={`text-lg font-serif mb-4 ${theme.text}`}>
              Personalized Service
            </h3>
            <p className={`text-sm leading-relaxed ${theme.textMuted}`}>
              From the first inquiry to your journey's end, our dedicated architects 
              craft experiences tailored to your unique preferences.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className={`text-lg font-serif mb-4 ${theme.text}`}>
              Sustainable Travel
            </h3>
            <p className={`text-sm leading-relaxed ${theme.textMuted}`}>
              We partner with local communities and eco-conscious providers, 
              ensuring our journeys leave a positive impact.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 text-center mt-20">
        <h2 className={`text-2xl md:text-3xl font-serif italic mb-6 ${theme.text}`}>
          Begin Your Journey
        </h2>
        <p className={`text-sm md:text-base leading-loose ${theme.textMuted} mb-8`}>
          Whether you seek adventure, relaxation, cultural immersion, or artistic inspiration, 
          we're here to turn your travel dreams into reality.
        </p>
        <button 
          className={`px-8 md:px-12 py-3 md:py-4 ${theme.accent} ${theme.accentText} text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition`}
        >
          Contact Our Team
        </button>
      </div>
    </div>
  );
};

export default AboutView;