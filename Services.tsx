import React from 'react';
import { SERVICES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import * as Icons from 'lucide-react';

const Services: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">{t.services.label}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t.services.title}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            // Dynamically get icon component
            // @ts-ignore - Lucide icons are accessible via string key if we import * as Icons
            const IconComponent = Icons[service.icon] || Icons.HelpCircle;

            return (
              <div key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-8 border border-gray-100">
                <div className="inline-flex items-center justify-center p-3 bg-secondary-50 rounded-lg">
                  <IconComponent className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{service.title[language]}</h3>
                <p className="mt-2 text-gray-500 leading-relaxed">
                  {service.description[language]}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-400 font-medium">{t.services.startFrom}</span>
                  <span className="text-lg font-bold text-primary-600">{service.priceStart}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
