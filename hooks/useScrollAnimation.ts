'use client'

import { useEffect, useState, useCallback } from 'react';

export function useScrollAnimation() {
  const [activeSection, setActiveSection] = useState('home');

  const animateElements = useCallback(() => {
    const elements = document.querySelectorAll('.scroll-reveal, .stagger-animation, .slide-in-left, .slide-in-right, .fade-in, .scale-in');
    
    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      
      if (isVisible && !element.classList.contains('animate-in')) {
        // Add staggered delay for card animations
        if (element.classList.contains('stagger-animation')) {
          setTimeout(() => {
            element.classList.add('animate-in');
          }, index * 100);
        } else {
          element.classList.add('animate-in');
        }
      }
    });
  }, []);

  useEffect(() => {
    // Intersection Observer for section tracking
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    // Intersection Observer for animations
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('stagger-animation')) {
              // Handle staggered animations for cards
              const parent = entry.target.closest('section') || entry.target.parentElement;
              const siblings = parent?.querySelectorAll('.stagger-animation') || [];
              const index = Array.from(siblings).indexOf(entry.target as Element);
              
              // Faster animation for features section
              const isFeatureSection = parent?.id === 'features';
              const delay = isFeatureSection ? index * 80 : index * 150;
              
              setTimeout(() => {
                entry.target.classList.add('animate-in');
              }, delay);
            } else {
              entry.target.classList.add('animate-in');
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe sections for navigation
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => sectionObserver.observe(section));

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.scroll-reveal, .stagger-animation, .slide-in-left, .slide-in-right, .fade-in, .scale-in');
    animatedElements.forEach((element) => animationObserver.observe(element));

    // Handle scroll for staggered animations
    const handleScroll = () => {
      requestAnimationFrame(animateElements);
    };

    // Throttle scroll events for better performance
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        handleScroll();
      }, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial animation check
    animateElements();

    return () => {
      sectionObserver.disconnect();
      animationObserver.disconnect();
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [animateElements]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return { activeSection, scrollToSection };
}