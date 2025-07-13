'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import image from '@/public/aegis-logo.png';

interface NavigationProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'demo', label: 'Demo' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'docs', label: 'Documentation' },
  ];

  const handleSectionClick = (section: string) => {
    onSectionClick(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-all duration-300 ${
      isScrolled 
        ? 'mt-8 xl:mx-64 md:mx-24 sm:-mx-16 backdrop-blur-lg rounded-full shadow-lg border border-gray-200/50'
        : 'backdrop-blur-lg border-b border-gray-200/50'
    }`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isScrolled ? 'py-2' : ''}`}>
        <div className={`flex justify-between items-center transition-all duration-300 will-change-transform ${isScrolled ? 'h-12' : 'h-16'}`}>
          <div className="flex items-center space-x-2">
            <Image
              src={image}
              alt="Aegis AI Logo"
              width={32}
              height={32}
              className="object-cover mix-blend-overlay"
              priority
            />
            <span className={`font-bold text-gray-900 transition-all duration-300 will-change-transform ${
              isScrolled ? 'xl:text-xl md:text-sm' : 'text-xl'
            }`}>Aegis AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`transition-all duration-300 will-change-transform hover:text-blue-600 ${
                  isScrolled ? 'xl:text-base md:text-sm' : 'text-base'
                } ${
                  activeSection === item.id ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 will-change-transform ${
              isScrolled ? 'px-3 py-1.5 lg:text-base md:text-sm' : 'px-4 py-2 text-base'
            }`} onClick={() => window.location.href = '/booking?type=call'}>
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden will-change-transform" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`transition-all duration-300 will-change-transform ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
            ) : (
              <Menu className={`transition-all duration-300 will-change-transform ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 will-change-transform ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`bg-white/90 backdrop-blur-md border-t border-gray-200 ${
          isScrolled ? 'rounded-b-2xl' : ''
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 will-change-transform"
              >
                {item.label}
              </button>
            ))}
            <button className="w-full mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 will-change-transform px-4 py-2">
              onClick={() => window.location.href = '/booking?type=call'}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}