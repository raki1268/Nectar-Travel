import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';
import contentData from '../../data/content.json';
import { siteConfig } from '../../src/config/siteConfig';

const Footer = ({ theme, onNavigate }) => {
  const footerContent = contentData.footer;

  return (
    <footer className={`${theme.bg} border-t ${theme.border} pt-16 pb-8 transition-colors duration-500 bg-pattern`}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Section */}
        <div className="md:col-span-1">
          <div className={`font-serif text-lg font-bold ${theme.text} mb-4`}>
            {siteConfig.siteName}
          </div>
          <p className={`text-xs ${theme.textMuted} leading-relaxed pr-4`}>
            {footerContent.description}
          </p>
        </div>

        {/* Links Section */}
        <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Company Links */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest ${theme.text} mb-4`}>
              {footerContent.company.title}
            </h4>
            <ul className={`space-y-2 text-xs ${theme.textMuted}`}>
              {footerContent.company.links.map((link, index) => (
                <li 
                  key={index}
                  onClick={() => onNavigate(link.action)} 
                  className="cursor-pointer hover:underline"
                >
                  {link.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest ${theme.text} mb-4`}>
              {footerContent.support.title}
            </h4>
            <ul className={`space-y-2 text-xs ${theme.textMuted}`}>
              {footerContent.support.links.map((link, index) => (
                <li 
                  key={index}
                  onClick={() => onNavigate(link.action)} 
                  className="cursor-pointer hover:underline"
                >
                  {link.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-start md:items-end">
          <h4 className={`text-xs font-bold uppercase tracking-widest ${theme.text} mb-4`}>
            Follow Us
          </h4>
          <div className={`flex space-x-4 ${theme.textMuted}`}>
            <a 
              href={siteConfig.social.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
            >
              <Instagram size={18} />
            </a>
            <a 
              href={siteConfig.social.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition"
            >
              <Facebook size={18} />
            </a>
            <a 
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:scale-110 transition"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={`max-w-6xl mx-auto px-6 text-center border-t ${theme.border} pt-8`}>
        <p className={`text-[10px] uppercase tracking-widest ${theme.textMuted}`}>
          {footerContent.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;