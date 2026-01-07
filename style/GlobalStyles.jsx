import React from 'react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
    
    /* Background Pattern */
    .bg-pattern {
      background-color: transparent;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      background-attachment: scroll; 
    }

    /* Custom Fonts */
    .font-script {
      font-family: 'Pinyon Script', cursive;
    }
    
    /* Hide Scrollbar */
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    /* Fade Animation */
    .fade-enter { 
      opacity: 0; 
    }
    .fade-enter-active { 
      opacity: 1; 
      transition: opacity 1000ms ease-in-out; 
    }
    
    /* Sepia Brown Filter */
    .sepia-brown {
      filter: sepia(100%) hue-rotate(-30deg) saturate(1.2) brightness(0.7);
    }
    
    /* Selection Color */
    ::selection {
      background: #d4d4d4;
      color: #000;
    }

    /* Smooth Scroll */
    html {
      scroll-behavior: smooth;
    }

    /* Base Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Body Base Styles */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Fade In Animation */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in {
      animation: fadeIn 0.6s ease-out;
    }

    /* Line Clamp Utility */
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `}</style>
);

export default GlobalStyles;