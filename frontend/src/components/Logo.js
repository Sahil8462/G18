import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Logo = ({ size = 'md', showText = true }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('authToken');
  const homePath = isAuthenticated ? '/dashboard' : '/';
  
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-2xl' },
    lg: { icon: 48, text: 'text-3xl' }
  };

  const { icon, text } = sizes[size];

  return (
    <Link to={homePath} className="flex items-center space-x-3 hover:opacity-80">
      <div className="relative">
        <svg width={icon} height={icon} viewBox="0 0 80 40" fill="none">
          {/* Background gradient circle for G */}
          <defs>
            <linearGradient id="gradientG" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <linearGradient id="gradient19" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* G Letter */}
          <circle cx="20" cy="20" r="18" fill="url(#gradientG)" filter="url(#glow)" />
          <circle cx="20" cy="20" r="12" fill="none" stroke="white" strokeWidth="3" />
          <rect x="20" y="14" width="8" height="3" fill="white" />
          <rect x="25" y="17" width="3" height="6" fill="white" />
          
          {/* 19 Numbers */}
          <g fill="url(#gradient19)" filter="url(#glow)">
            {/* Number 1 */}
            <rect x="45" y="8" width="4" height="24" fill="url(#gradient19)" />
            <rect x="41" y="8" width="8" height="3" fill="url(#gradient19)" />
            <rect x="41" y="29" width="12" height="3" fill="url(#gradient19)" />
            
            {/* Number 9 */}
            <circle cx="65" cy="16" r="8" fill="none" stroke="url(#gradient19)" strokeWidth="3" />
            <circle cx="65" cy="16" r="3" fill="url(#gradient19)" />
            <rect x="65" y="24" width="3" height="8" fill="url(#gradient19)" />
            <circle cx="65" cy="28" r="4" fill="none" stroke="url(#gradient19)" strokeWidth="2" />
          </g>
          
          {/* Connecting element */}
          <rect x="38" y="19" width="9" height="2" fill="#06b6d4" opacity="0.6" />
        </svg>
      </div>
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent ${text}`}>
          Smart Hire Portal
        </span>
      )}
    </Link>
  );
};

export default Logo;