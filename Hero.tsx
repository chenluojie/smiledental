import React from 'react';
import { ShieldCheck, Clock, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookClick = (e: React.MouseEvent) => {
    // 1. Dispatch event to reset/highlight the form
    window.dispatchEvent(new CustomEvent('clinic-book-now'));
    
    // 2. Perform smooth scroll
    scrollToSection(e, 'appointment');
  };

  return (
    <div id="home" className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          {/* Diagonal clip path background for desktop */}
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{t.hero.titleStart}</span>{' '}
                <span className="block text-primary-600 xl:inline">{t.hero.titleEnd}</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {t.hero.subtitle}
              </p>
              
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#appointment"
                    onClick={handleBookClick}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg transition-all active:scale-95 shadow-lg shadow-primary-500/20"
                  >
                    {t.hero.ctaBook}
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#services"
                    onClick={(e) => scrollToSection(e, 'services')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg transition-all active:scale-95"
                  >
                    {t.hero.ctaServices}
                  </a>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-5 h-5 text-secondary-500" />
                  <span>{t.hero.trust.certified}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5 text-secondary-500" />
                  <span>{t.hero.trust.support}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-5 h-5 text-secondary-500" />
                  <span>{t.hero.trust.rated}</span>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://picsum.photos/800/600?random=10"
          alt="Modern dental clinic interior"
        />
      </div>
    </div>
  );
};

export default Hero;