import React, { useState } from 'react';
import { Menu, X, Stethoscope, Globe } from 'lucide-react';
import { CLINIC_INFO } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.home, href: '#home', id: 'home' },
    { name: t.nav.services, href: '#services', id: 'services' },
    { name: t.nav.doctors, href: '#doctors', id: 'doctors' },
    { name: t.nav.testimonials, href: '#testimonials', id: 'testimonials' },
    { name: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  // Programmatic scroll handler to prevent "White Screen" caused by standard hash navigation
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Attempt to find the element
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookClick = (e: React.MouseEvent) => {
    // Intercept standard link behavior
    e.preventDefault();
    setIsOpen(false);
    
    // Trigger form reset event
    window.dispatchEvent(new CustomEvent('clinic-book-now'));
    
    // Scroll to appointment section
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={(e) => scrollToSection(e, 'home')} 
              className="flex-shrink-0 flex items-center gap-2 outline-none"
            >
              <div className="bg-primary-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">{CLINIC_INFO.name}</h1>
                <p className="text-xs text-primary-600 font-medium">{CLINIC_INFO.chineseName}</p>
              </div>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.id)}
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors border-l pl-4 ml-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? '中文' : 'EN'}
            </button>

            <a
              href="#appointment"
              onClick={handleBookClick}
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm transition-all hover:shadow-lg active:scale-95"
            >
              {t.nav.bookBtn}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
             <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-gray-600 hover:text-primary-600 px-2 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? '中文' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.id)}
                className="text-gray-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 pb-2">
              <a
                href="#appointment"
                onClick={handleBookClick}
                className="w-full text-center block bg-primary-600 text-white px-3 py-3 rounded-md text-base font-medium shadow-md active:bg-primary-700"
              >
                {t.nav.bookFull}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;